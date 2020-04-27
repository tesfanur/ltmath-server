"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require("./user");

var _question = require("./question");

var _subject = require("./subject");

var _topic = require("./topic");

var typeDefsArray = [_user.userTypedefs, _subject.subjectTypedefs, _topic.topicTypedefs, _question.questionTypedefs];
exports.default = typeDefsArray;