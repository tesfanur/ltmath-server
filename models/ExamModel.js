import mongoose from "mongoose";
import { hash, genSalt, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_KEY } = process.env;
import { AuthenticationError } from "apollo-server";

const ExamSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    hasImage: { type: Boolean },
    hasMathematicalExpression: { type: Boolean },
    subtopic: {
      type: String
    },
    choices: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  },
  { timestamps: true }
);
//TODO: try to re design the data model. refer similar online exam data model
const ExamModel = mongoose.model("Exam", ExamSchema);
export { ExamModel };
