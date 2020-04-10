import { Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;
const ChoiceSchema = new Schema({
  description: { type: String, required: true },
});

const QuestionSchema = new Schema(
  {
    questionNumber: { type: String },
    description: { type: String, required: true },
    topicId: { type: ObjectId, ref: "Topic" },
    subtopic: { description: { type: String, required: true } },
    complexityLevel: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      default: "MEDIUM",
    },
    multipleChoice: [ChoiceSchema],
    imageUrl: { type: String },
    answer: { type: String },
    explanation: { type: String },
    addedBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);
const QuestionModel = model("Question", QuestionSchema);
export default QuestionModel;
