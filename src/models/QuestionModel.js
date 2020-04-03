import { Schema, model } from "mongoose";

const ChoiceSchema = new Schema({
  description: { type: String, required: true }
});

const QuestionSchema = new Schema(
  {
    questionNumber: { type: String },
    description: { type: String, required: true },
    topic: { type: String, required: true },
    subtopic: { type: String, required: true },
    complexityLevel: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      default: "MEDIUM"
    },
    multipleChoice: [ChoiceSchema],
    imageUrl: { type: String },
    answer: { type: String },
    explanation: { type: String },
    addedBy: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);
const QuestionModel = model("Question", QuestionSchema);
export default QuestionModel;
