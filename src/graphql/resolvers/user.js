import dotenv from "dotenv";
import mongoose from "mongoose";
import { sign } from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server";

import UserModel from "../../models/UserModel";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const isValidObjectId = (_id) => mongoose.Types.ObjectId.isValid(_id);
/**
 *
 * @param {*} payload
 * @param {*} secret
 * @param {*} expiresIn
 */
const generateAuthToken = (payload, secret, expiresIn) => {
  return "Bearer " + sign(payload, secret, { expiresIn });
};
const setTokens = (user) => {
  // console.log({ userfromSetTokens: user });
  const sevenDays = 60 * 60 * 24 * 7 * 1000;
  const fifteenMins = 60 * 15 * 1000;
  const accessUser = {
    // id: user._id
    username: user.username,
    email: user.email,
  };
  const accessToken = generateAuthToken(accessUser, SECRET_KEY, fifteenMins);

  const refreshUser = {
    username: user.username,
    email: user.email,
    count: user.tokenCount,
  };
  const refreshToken = generateAuthToken(refreshUser, SECRET_KEY, sevenDays);

  return { accessToken, refreshToken };
};

/**
 *
 * @param {*} _ parent object enclosing the resolver
 * @param {*} input {email,username, password}
 */

const signup = async (_, { input }, { req, res }) => {
  //destructure user input
  const { username, email, password, usertype } = input;
  console.log({
    username,
    email,
    usertype,
  });
  //TODO: validate user input
  const { error, value } = UserModel.validate({
    username,
    email,
    password,
  });
  const validationError = error;
  // console.log({ error, value });
  // console.log("error-object:=>", error.details[0].message);
  //
  if (validationError) throw new UserInputError(error.details[0].message);

  //check if user aldready exists in the db by this email or username
  const existingUserByEmail = await UserModel.findOne({ email });
  const existingUserByUsername = await UserModel.findOne({ username });
  //if user doesn't exist register it
  if (!existingUserByEmail && !existingUserByUsername) {
    //use id for signing with jwt since username or email may be changed by a user
    const payload = {
      email,
      username,
    };
    const token = generateAuthToken(payload, SECRET_KEY, "7d");
    const userInput = {
      ...input,
    };
    const user = await new UserModel(userInput).save();
    // req.header("authorization", token);
    // req.headers.authorization = token;
    res.cookie("authorization", token, {
      httpOnly: true,
      secure: true,
    });
    res.set("Access-Control-Expose-Headers", "*");
    res.header("authorization", token);
    return { token };
  }
  throw new UserInputError(`User with ${username} username already exists!`);
};
/**
 *
 * @param {*} _
 * @param {*} input  {email,username, password}
 * @param {*} {user}  {email, username, iat, expIn}
 * @return {       
      token
    };
 */

const signin = async (_, { input }, { req, res }) => {
  const { username, password } = input;
  // console.log({ headers: req.req.headers });
  //TODO: validate user signin input
  // const validationResult = UserModel.validate(input);
  // console.log(validationResult);
  const extractedUser = await UserModel.findOne({
    username,
  }).select("-password");
  // console.log("extractedUser =>", extractedUser);
  if (!extractedUser) throw new UserInputError("Invalid username or password");
  //compare password using user method
  extractedUser.checkPasswordValidity(password);
  let { usertype, email } = extractedUser;
  const userpayload = {
    email,
    username,
    usertype,
  };
  const token = generateAuthToken(userpayload, SECRET_KEY, "7d");
  res.cookie("authorization", token, {
    httpOnly: true,
    secure: true,
  });
  // res.set("Access-Control-Expose-Headers", "*");
  res.header("authorization", token);

  return { token };
};
const getAllUsers = async (_, args, { req, res }, info) => {
  //TODO: handle user role management from ctx object
  const token = req.headers.authorization || req.cookies.authorization || "";
  console.log({ token });
  if (!token) throw new AuthenticationError("Authorization Failure");
  const decoded = await UserModel.verifyAccessToken(token);
  console.log({ decoded });
  const users = await UserModel.find().exec();
  // console.log({ users });
  if (decoded.usertype === "ADMIN") return users;
  else
    throw new AuthenticationError("You are not allowed to view lsit of users");
};

const getUserByEmail = async (_, { email }) => {
  const user = await UserModel.findOne({ email }).select("-password");
  if (!user) throw new Error("No user found");
  //TODO: handle if user not found
  console.log({ user });
  return user;
};
const getUserByUsername = async (_, { username }) => {
  const user = await UserModel.findOne({ username }).select("-password");
  if (!user) throw new Error("No user found");
  return user;
};
const getUserByID = async (_, { _id }) => {
  if (!isValidObjectId(_id)) throw new Error(`${_id} is Invalid user id`);
  const user = await UserModel.findOne({ _id }).select("-password");
  if (!user) throw new Error("No user found");
  // console.log({ user });
  return user;
};

const userResolvers = {
  Mutation: {
    signup,
    signin,
  },
  Query: {
    users: getAllUsers,
    getUserByEmail,
    getUserByUsername,
    getUserByID,
  },
};

export { userResolvers };
