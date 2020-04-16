import { Schema, model } from "mongoose";
import { hash, genSalt, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_KEY } = process.env;
import { AuthenticationError } from "apollo-server";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    usertype: {
      type: String,
      enum: ["STUDENT", "PARENT", "TEACHER", "AUTHOR", "ADMIN"],
      default: "STUDENT",
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 400,
    },
  },
  { timestamps: true }
);
/**
 * Validates user input with its proper schema definition
 */
UserSchema.statics.validate = function validateSchema(User) {
  const schema = Joi.object()
    .keys({
      username: Joi.string().alphanum().min(5).max(50).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{5,200}$/),
      email: Joi.string().min(5).max(50).email({ minDomainAtoms: 2 }),
    })
    .with("username", "email");

  return Joi.validate(User, schema);
};
/**
 * hash password whenever user updates his password
 */
UserSchema.pre("save", async function hashPassword(next) {
  try {
    // let user = this;
    // console.log({ userFromPreSaveMiddleware: user });
    // only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) return next();
    // generate a salt fpr hashing
    const SALT_ROUND = await genSalt(12);
    // console.log({ SALT_ROUND });
    // hash the password along with our new salt
    const hashedPassword = await hash(this.password, SALT_ROUND);
    // override the plain text password with the hashed one
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
/**
 * compare user password matching
 */
UserSchema.methods.checkPasswordValidity = async function (password) {
  try {
    const passwordMatches = await compare(password, this.password);
    if (!passwordMatches)
      throw new AuthenticationError("Invalid Password or Username");
    return passwordMatches;
  } catch (error) {
    throw new AuthenticationError(
      `Something went wrong. Try again later please. error: ${error}`
    );
  }
};
/**
 *generate user access token
 */
UserSchema.methods.generateAccessToken = async function () {
  try {
    let user = this;
    let token = await sign(
      { _id: user._id.toHexString(), username: user.username },
      SECRET_KEY
    );
    if (token) return token;
  } catch (error) {
    throw new AuthenticationError("Authentication failed!");
  }
};
/**
 * decode user access token
 */
UserSchema.statics.verifyAccessToken = async function (token) {
  // const user = this;
  // console.log({ tokenFromVerifyAccessToken: token });
  if (!token) return new AuthenticationError("Token Authorization failed!");
  token = token.replace("Bearer ", "");
  let decodedUserInfo = await verify(token, SECRET_KEY);
  // console.log({ userschema: this }, { decodedUserInfo });
  try {
    //TODO modify the code below for token verification
    if (decodedUserInfo) {
      const { email, username } = decodedUserInfo;
      const currentUser = await this.findOne({ username }).exec();
      if (!currentUser)
        throw new AuthenticationError("Token Authorization failed!");
      const { usertype } = currentUser;
      // console.log("decodedUserInfo", { ...decodedUserInfo, usertype });
      return { ...decodedUserInfo, usertype };
    }
  } catch (error) {
    throw new AuthenticationError("Authentication failed!");
  }
};
const UserModel = model("User", UserSchema);
//==============================
export default UserModel;
