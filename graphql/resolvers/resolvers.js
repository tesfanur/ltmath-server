import UserModel from "./../../models/UserModel";
import { sign } from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
/**
 *
 * @param {*} payload
 * @param {*} secret
 * @param {*} expiresIn
 */
const createToken = (payload, secret, expiresIn) => {
  return sign(payload, secret, { expiresIn });
};
const setTokens = user => {
  // console.log({ userfromSetTokens: user });
  const sevenDays = 60 * 60 * 24 * 7 * 1000;
  const fifteenMins = 60 * 15 * 1000;
  const accessUser = {
    // id: user._id
    username: user.username,
    email: user.email
  };
  const accessToken = createToken(accessUser, SECRET_KEY, fifteenMins);

  const refreshUser = {
    username: user.username,
    email: user.email,
    count: user.tokenCount
  };
  const refreshToken = createToken(refreshUser, SECRET_KEY, sevenDays);

  return { accessToken, refreshToken };
};

/**
 *
 * @param {*} _ parent object enclosing the resolver
 * @param {*} input {email,username, password}
 */

const signup = async (_, { input }) => {
  //destructure user input
  const { username, email, password, usertype } = input;
  // console.log({ username, email, usertype });
  //TODO: validate user input

  const { error, value } = UserModel.validate({
    username,
    email,
    password
  });
  const validationError = error;
  // console.log({ error, value });
  // console.log("error-object:=>", error.details[0].message);
  //
  if (validationError) throw new AuthenticationError(error.details[0].message);

  //check if user aldready exists in the db
  const currentUser = await UserModel.findOne({ email }).exec();
  // console.log({ currentUser });
  //if user doesn't exist register it
  if (!currentUser) {
    //use id for signing with jwt since username or email may be changed by a user
    const payload = {
      email,
      username
    };
    const token = createToken(payload, SECRET_KEY, "30d");
    const userInput = { ...input, token };
    const user = await new UserModel(userInput).save();

    return user;
  } else {
    throw new UserInputError(`User with ${username} username already exists!`);
  }
};
/**
 *
 * @param {*} _
 * @param {*} input  {email,username, password}
 * @param {*} {user}  {email, username, iat, expIn}
 * @return {
      username,
      email,      
      token
    };
 */

const signin = async (_, { input }, { req, res }) => {
  const { email, username, password } = input;
  // console.log({ headers: req.req.headers });
  //TODO: validate user signin input
  // const validationResult = UserModel.validate(input);
  // console.log(validationResult);
  const userExtractedFromDB = await UserModel.findOne({
    email,
    username
  }).exec();
  // console.log("userExtractedFromDB =>", userExtractedFromDB);
  if (!userExtractedFromDB)
    throw new UserInputError("Invalid username or password");
  //compare password using user method
  userExtractedFromDB.checkPasswordValidity(password);

  let { usertype } = userExtractedFromDB;
  const userpayload = {
    email,
    username
  };
  const token = createToken(userpayload, SECRET_KEY, "3d");

  //  the following code would be req.req.headers.authorization = "Bearer " + token; if the input argument were not destructed
  req.headers.authorization = "Bearer " + token;
  const response = {
    username,
    usertype,
    email,
    token
  };

  // console.log(
  //   `setTokens({ username, email }) =>`,
  //   setTokens({ username, email })
  // );
  return response;
};

const getAllUsers = async (_, args, { req, user }, info) => {
  //TODO: handle user role management from ctx object
  const access_token = req.headers;
  // console.log({ access_token });
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV2YW5hbWFuZ2F0b0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImV2YW5hbWFuZ2F0byIsImlhdCI6MTU4NDM3MzQzNCwiZXhwIjoxNTg2OTY1NDM0fQ.ZzC6maHugPDz9Dct2TRQU47JUt_ZU7d1O4d2BV8w3jw";
  const decoded = await UserModel.verifyAccessToken(token);
  // console.log({ decoded });
  const users = await UserModel.find().exec();
  // console.log({ users });
  if (decoded.usertype === "ADMIN") return users;
  else
    throw new AuthenticationError("You are not allowed to view lsit of users");
};

const getUserByEmail = async (_, { email }) => {
  const user = await UserModel.findOne({ email }).exec();
  //TODO: handle if user not found
  // console.log({ user });
  return user;
};
const getUserByUsername = async (_, { username }) => {
  const user = await UserModel.findOne({ username }).exec();
  //TODO: handle if user not found
  // console.log({ ...user.doc });
  return user;
};
const getUserByID = async (_, { _id }) => {
  const user = await UserModel.findOne({ _id }).exec();
  // console.log({ userObtainedBygetUserByID: user });
  //TODO: handle if user not found
  // console.log({ ...user.doc });
  return user;
};

const resolvers = {
  Mutation: {
    signup,
    signin
  },
  Query: {
    authenticationError: (parent, args, context) => {
      throw new AuthenticationError("must authenticate");
    },
    users: getAllUsers,
    getUserByEmail,
    getUserByUsername,
    getUserByID
  }
};

module.exports = resolvers;
