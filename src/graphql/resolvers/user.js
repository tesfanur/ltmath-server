import dotenv from "dotenv";
import mongoose from "mongoose";
import { sign } from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server";
import {
  validateSignupInput,
  validateSigninInput,
} from "../../utils/validateUserInput";

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

/**
 *
 * @param {*} _ parent object enclosing the resolver
 * @param {*} input {email,username, password}
 */

const signup = async (_, { input }, { req, res }) => {
  //destructure user input
  console.log({ signUpinput: input });
  const { username, email, password, confirmPassword, usertype } = input;
  console.log("userSignupInput", {
    username,
    email,
    password,
    confirmPassword,
    usertype,
  });
  //validate user input
  const { errors, valid } = validateSignupInput({
    username,
    email,
    password,
    confirmPassword,
  });
  console.log("from signup valid check result", { errors, valid });
  if (!valid) {
    console.log({ testErrorForValidUserInput: errors });
    throw new UserInputError("Invalide user input", { errors });
  }

  //check if user aldready exists in the db by this email or username
  const existingUserByEmail = await UserModel.findOne({ email });
  const existingUserByUsername = await UserModel.findOne({ username });
  if (existingUserByEmail) {
    errors.email = `This email already exists`;
    console.log({ errors });
    throw new UserInputError("Email exists", {
      errors,
    });
  }

  if (existingUserByUsername) {
    errors.username = `This username already exists`;
    console.log({ errors });
    throw new UserInputError("Username exists", {
      errors,
    });
  }
  //save user to db
  try {
    const user = await new UserModel({
      username,
      email,
      password,
    }).save();
    const payload = {
      email: user.email,
      username: user.username,
      usertype: user.usertype,
    };
    const token = generateAuthToken(payload, SECRET_KEY, "7d");
    res.cookie("authorization", token, {
      httpOnly: true,
      secure: true,
    });
    res.set("Access-Control-Expose-Headers", "*");
    res.header("authorization", token);
    return { token };
  } catch (error) {
    errors.general = "`Something went wrong`";
    throw new UserInputError(`Unknown Problem`, errors);
  }
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
  // console.log({ signIninput: input });
  const { username, password } = input;
  const { errors, valid } = validateSigninInput(username, password);
  if (!valid) throw new UserInputError("Invalid user input!", { errors });
  // console.log(validationResult);
  const extractedUser = await UserModel.findOne({
    username,
  });
  // console.log("extractedUser =>", extractedUser);
  if (!extractedUser) {
    errors.userNotFound = "Invalid Credential";
    throw new UserInputError("Invalid username or password", { errors });
  }
  //compare password using user method
  let passwordMatch = await extractedUser.checkPasswordValidity(password);
  // console.log({ passwordMatch });
  if (!passwordMatch) {
    errors.invalidCredentials = "Invalid username or password";
    throw new UserInputError("Invalid username or password", { errors });
  }
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

const deleteUserById = async (_, { userId }, { req, res }) => {
  if (!isValidObjectId(userId)) throw Error("Invalid User ID");
  const updatedUserDocument = await UserModel.findOneAndRemove(
    { _id: userId },
    { useFindAndModify: false, new: true }
  );
  console.log({ updatedUserDocument });
  if (!updatedUserDocument)
    throw Error("No user found to delete with user id " + userId);
  return updatedUserDocument;
};
/**
 *
 * @param {*} _
 * @param {*} args
 * @param {*} param2
 * @param {*} info
 */

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
const getUserByID = async (_, { userId }) => {
  if (!isValidObjectId(userId)) throw new Error(`${userId} is Invalid user id`);
  const user = await UserModel.findOne({ _id: userId }).select("-password");
  if (!user) throw new Error("No user found");
  // console.log({ user });
  return user;
};

const userResolvers = {
  Mutation: {
    signup,
    signin,
    deleteUserById,
  },
  Query: {
    users: getAllUsers,
    getUserByEmail,
    getUserByUsername,
    getUserByID,
  },
};

export { userResolvers };
