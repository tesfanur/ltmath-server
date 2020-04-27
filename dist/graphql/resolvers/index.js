"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _user = require("./user");

var _question = require("./question");

var _subject = require("./subject");

var _topic = require("./topic");

var resolvers = {
  Mutation: _extends({}, _user.userResolvers.Mutation, _question.questionResolvers.Mutation, _subject.subjectResolvers.Mutation, _topic.topicResolvers.Mutation),
  Query: _extends({}, _user.userResolvers.Query, _question.questionResolvers.Query, _subject.subjectResolvers.Query, _topic.topicResolvers.Query)
};
exports.default = resolvers;