// import { AuthenticationError } from "apollo-server";
import UserModel from "./../models/UserModel";
const context = async ({ req, res }) => {
  //set isAuthenticated to false and user to nul if not authenticated
  req.isAuthenticated = false;
  req.user = null;
  // get the user token from the headers
  let token = req.headers.authorization || "";
  let user;
  try {
    // try to retrieve a user with the token
    user = await UserModel.verifyAccessToken(token);
    console.log({ user, contextCallCounter: contextCallCounter++ });
    if (user) {
      req.user = user;
      req.isAuthenticated = true;
      return { req, res, user };
    }
  } catch (error) {
    // throw new AuthenticationError("you must be logged in" + error);
    console.log("you must be logged in " + error);
    return { req, res, user };
  }
  // optionally block the user
  // we could also check user roles/permissions here
  if (!user) {
    console.log("you must be logged in ");
    return { req, res, user };
  }

  // add the user to the context
  return { req, res, user };
};

export default context;
