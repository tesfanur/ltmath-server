import { Schema, model } from "mongoose";

const ExamSchema = new Schema({
  examId: { type: String, trim: true, required: true, unique: true },
  subjectId: { type: String },
  studentId: { type: String },
});
const ExamModel = model("Exam", ExamSchema);
export default ExamModel;
