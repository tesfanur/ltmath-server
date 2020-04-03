"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var TopicSchema = new _mongoose.Schema({
  description: { type: String, trim: true, required: true, unique: true }
});
var TopicModel = (0, _mongoose.model)("Topic", TopicSchema);
exports.default = TopicModel;