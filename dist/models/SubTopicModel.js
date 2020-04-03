"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var SubTopicSchema = new _mongoose.Schema({
  description: { type: String, trim: true, required: true, unique: true }
});

var SubTopicModel = (0, _mongoose.model)("SubTopic", SubTopicSchema);
exports.default = SubTopicModel;