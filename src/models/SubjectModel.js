import { Schema, model } from "mongoose";
//exam subject schema
const SubjectSchema = new Schema({
  subjectName: { type: String },
});

const SubjectModel = model("Subject", SubjectSchema);
export default SubjectModel;
