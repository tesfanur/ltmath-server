"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var ObjectId = _mongoose.Schema.Types.ObjectId;

var ChoiceSchema = new _mongoose.Schema({
  description: { type: String, required: true }
});

var QuestionSchema = new _mongoose.Schema({
  questionNumber: { type: String },
  description: { type: String, required: true },
  subTopicId: { type: ObjectId },
  complexityLevel: {
    type: String,
    enum: ["EASY", "MEDIUM", "HARD"],
    default: "MEDIUM"
  },
  multipleChoice: [ChoiceSchema],
  imageUrl: { type: String },
  answer: { type: String },
  explanation: { type: String },
  addedBy: { type: ObjectId, ref: "User" }
}, { timestamps: true });
var QuestionModel = (0, _mongoose.model)("Question", QuestionSchema);
exports.default = QuestionModel;