"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

//exam subject schema
var SubjectSchema = new _mongoose.Schema({
  subjectName: { type: String, unique: true, trim: true, index: 1 }
});

var SubjectModel = (0, _mongoose.model)("Subject", SubjectSchema);
exports.default = SubjectModel;