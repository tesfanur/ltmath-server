"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var ObjectId = _mongoose.Schema.Types.ObjectId; // import uniqueValidator from "mongoose-unique-validator";
// import uniqueArrayPlugin from "mongoose-unique-array";

var subtopicSubSchema = new _mongoose.Schema({
  subTopic: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    index: 1
  }
});
var topicSubSchema = new _mongoose.Schema({
  topic: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    index: 1
  },
  subTopics: [subtopicSubSchema]
  // { _id: false }
});

//register schema so that you can directly refence it
// export const TopicSubDocument = model("TopicSubDocument", topicSubSchema);

var TopicSchema = new _mongoose.Schema({
  subjectId: { type: ObjectId, ref: "Subject" },
  topics: [topicSubSchema]
  // { _id: false }
});

TopicSchema.pre("validate", function validate(next) {
  var unique = [];

  for (var i = 0, l = this.topics.length; i < l; i++) {
    var prop = this.topics[i].topic + "-" + this.subjectId;

    if (unique.indexOf(prop) > -1) {
      console.log("There is a Duplicated sub document!. " + prop);
      return next(new Error("There is a Duplicated sub document!. " + prop));
    }

    unique.push(prop);
  }

  next();
});

// TopicSchema.plugin(uniqueValidator); //uniqueArrayPlugin
// TopicSchema.plugin(uniqueArrayPlugin);
var TopicModel = (0, _mongoose.model)("Topic", TopicSchema);
exports.default = TopicModel;