"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var ObjectId = _mongoose.Schema.Types.ObjectId;


var subtopicSubSchema = new _mongoose.Schema({
  subTopic: {
    type: String,
    trim: true,
    unique: true,
    required: true
  }
});

var SubTopicSchema = new _mongoose.Schema({
  topicId: { type: ObjectId, ref: "TopicSubDocument" },
  subTopics: [subtopicSubSchema]
});
/**
 * https://stackoverflow.com/questions/24853383/mongoose-objectid-that-references-a-sub-document
 */

SubTopicSchema.pre("validate", function validate(next) {
  var unique = [];

  for (var i = 0, l = this.subTopics.length; i < l; i++) {
    var prop = this.subTopics[i].subTopic + "-" + this.topicId;

    if (unique.indexOf(prop) > -1) {
      console.log("There is a Duplicated sub document!. " + prop);
      return next(new Error("There is a Duplicated sub document!. " + prop));
    }

    unique.push(prop);
  }

  next();
});

var SubTopicModel = (0, _mongoose.model)("SubTopic", SubTopicSchema);
exports.default = SubTopicModel;