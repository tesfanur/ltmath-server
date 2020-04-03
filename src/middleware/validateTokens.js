import { verify } from "jsonwebtoken";
import UserModel from "../models/UserModel";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_KEY } = process.env;

export const validateAccessToken = token => {
  try {
    return verify(token, SECRET_KEY);
  } catch (error) {
    return console.error(error);
  }
};

export const validateRefreshToken = token => {
  try {
    return verify(token, SECRET_KEY);
  } catch (error) {
    return error;
  }
};

// // module `validate-tokens-middleware`
// const {
//     validateAccessToken,
//     validateRefreshToken
//   } = require("./validate-tokens");
//   const userRepo = require("../users/users-repository");
//   const { setTokens } = require("./set-tokens");

export async function validateTokensMiddleware(req, res, next) {
  const refreshToken = req.headers["x-refresh-token"];
  const accessToken = req.headers["x-access-token"];
  console.log("from validateTokensMiddleware =>", {
    refreshToken,
    accessToken,
    headers: req.headers
  });
  // console.log({ responseObject: res });
  if (!accessToken && !refreshToken) return next();

  const decodedAccessToken = validateAccessToken(accessToken);
  if (decodedAccessToken && decodedAccessToken.user) {
    req.user = decodedAccessToken.user;
    return next();
  }

  const decodedRefreshToken = validateRefreshToken(refreshToken);
  if (decodedRefreshToken && decodedRefreshToken.user) {
    // valid refresh token
    const user = await UserModel.findOne({
      username: decodedRefreshToken.user.username
    });
    // console.log({ userFromValidateRefreshToken: user });
    // valid user and user token not invalidated
    if (!user || user.tokenCount !== decodedRefreshToken.user.count)
      return next();
    req.user = decodedRefreshToken.user;
    // refresh the tokens
    const userTokens = setTokens(user);

    res.set({
      "Access-Control-Expose-Headers": "x-access-token,x-refresh-token",
      "x-access-token": userTokens.accessToken,
      "x-refresh-token": userTokens.refreshToken
    });
    return next();
  }
  next();
}

export const setTokens = user => {
  console.log({ userfromSetTokens: user });
  const sevenDays = 60 * 60 * 24 * 7 * 1000;
  const fifteenMins = 60 * 15 * 1000;
  const accessUser = {
    // id: user._id
    username: user.username,
    email: user.email
  };
  const accessToken = sign({ user: accessUser }, SECRET_KEY, {
    expiresIn: fifteenMins
  });
  const refreshUser = {
    // id: user.id,
    username: user.username,
    email: user.email,
    count: user.tokenCount
  };
  const refreshToken = sign({ user: refreshUser }, SECRET_KEY, {
    expiresIn: sevenDays
  });

  return { accessToken, refreshToken };
};
