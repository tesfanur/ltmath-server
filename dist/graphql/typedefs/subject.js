"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subjectTypedefs = undefined;

var _templateObject = _taggedTemplateLiteral(["\n  \"\"\"\n  Subject\n  \"\"\"\n  type Subject {\n    _id: ID!\n    subjectName: String\n  }\n  \"\"\"\n  Subject Input\n  \"\"\"\n  input SubjectInput {\n    subjectName: String!\n  }\n  extend type Query {\n    \"\"\"\n    finds subject by id\n    \"\"\"\n    getSubjectById(subjectId: ID!): Subject!\n    \"\"\"\n    finds all subject\n    \"\"\"\n    getAllSubjects: [Subject]!\n  }\n  extend type Mutation {\n    \"\"\"\n    add Subject\n    \"\"\"\n    addSubject(subjectName: String): Subject\n    # deleteSubject\n    \"\"\"\n    add Subject\n    \"\"\"\n    deleteSubject(subjectId: ID): Subject\n\n    \"\"\"\n    edit Subject\n    \"\"\"\n    findSubjectByIdAndUpdate(\n      subjectId: ID\n      subjectUpdateOption: SubjectInput\n    ): Subject\n  }\n"], ["\n  \"\"\"\n  Subject\n  \"\"\"\n  type Subject {\n    _id: ID!\n    subjectName: String\n  }\n  \"\"\"\n  Subject Input\n  \"\"\"\n  input SubjectInput {\n    subjectName: String!\n  }\n  extend type Query {\n    \"\"\"\n    finds subject by id\n    \"\"\"\n    getSubjectById(subjectId: ID!): Subject!\n    \"\"\"\n    finds all subject\n    \"\"\"\n    getAllSubjects: [Subject]!\n  }\n  extend type Mutation {\n    \"\"\"\n    add Subject\n    \"\"\"\n    addSubject(subjectName: String): Subject\n    # deleteSubject\n    \"\"\"\n    add Subject\n    \"\"\"\n    deleteSubject(subjectId: ID): Subject\n\n    \"\"\"\n    edit Subject\n    \"\"\"\n    findSubjectByIdAndUpdate(\n      subjectId: ID\n      subjectUpdateOption: SubjectInput\n    ): Subject\n  }\n"]);

var _apolloServerExpress = require("apollo-server-express");

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

//TODO: add documentation for each query, resolver, etc
//using triple double quote """Resolved description """
//Math subject type definition
var subjectTypedefs = (0, _apolloServerExpress.gql)(_templateObject);

exports.subjectTypedefs = subjectTypedefs;