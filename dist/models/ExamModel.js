"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var ExamSchema = new _mongoose.Schema({
  examId: { type: String, trim: true, required: true, unique: true },
  subjectId: { type: String },
  studentId: { type: String }
});
var ExamModel = (0, _mongoose.model)("Exam", ExamSchema);
exports.default = ExamModel;