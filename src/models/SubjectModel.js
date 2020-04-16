import { Schema, model } from "mongoose";
//exam subject schema
const SubjectSchema = new Schema({
  subjectName: { type: String, unique: true, trim: true, index: 1 },
});

const SubjectModel = model("Subject", SubjectSchema);
export default SubjectModel;
