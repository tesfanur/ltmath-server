import { sign, compare } from "bcryptjs";
import UserModel from "../models/UserModel";

export const authenticate = async (_, { input }, context, info) => {
  const { username, password } = input;
  const currentUser = await UserModel.findOne(username).exec();

  if (!currentUser) {
    return console.log("User not found!");
  }

  const match = await compare(password, currentUser.password);
  if (!match) {
    //return error to user to let them know the password is incorrect
    return console.log("Authentication error!");
  }

  const token = sign(
    { email: currentUser.email, id: currentUser.id },
    SECRET_KEY
  );

  return {
    success: true,
    token: token
  };
};
/**
 *
 * @param {*} param
 */
export const context = ({ req }) => {
  const token = req.headers.authorization || "";

  try {
    return ({ id, email } = jwt.verify(token.split(" ")[1], SECRET_KEY));
  } catch (e) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }
};
