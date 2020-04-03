"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _question = require("./question");

var _user = require("./user");

var resolvers = {
  Mutation: _extends({}, _user.userResolvers.Mutation, _question.questionResolvers.Mutation),
  Query: _extends({}, _user.userResolvers.Query, _question.questionResolvers.Query)
};
exports.default = resolvers;