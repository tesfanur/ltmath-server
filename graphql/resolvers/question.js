import { AuthenticationError, UserInputError } from "apollo-server";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserModel from "./../../models/UserModel";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const isValidObjectId = _id => mongoose.Types.ObjectId.isValid(_id);
/**
 * Question Mutation Resolvers
    addQuestion(input: QuestionInput): Question
    editQuestion(input: QuestionInput): Question
    deleteQuestion(input: ID): Question
    addTopic(input: TopicInput): Topic
    addSubTopic(input: SubTopicInput): SubTopic
    editTopic(input: TopicInput): Topic
    deleteTopic(input: TopicInput): Topic
    editSubTopic(input: SubTopicInput): SubTopic
    deleteSubTopic(input: SubTopicInput): SubTopic
 */
/**
 *
 * @param {*} _ parent object enclosing the resolver
 * @param {*} input {email,username, password}
 */

const addQuestion = async (_, { input }, { req, res }) => {
  //destructure user input
  const { username, email, password, usertype } = input;

  return null;
};
const editQuestion = async (_, { input }, { req, res }) => {
  //destructure user input
  const { username, email, password, usertype } = input;

  return null;
};
/**
 *
 * @param {*} _
 * @param {*} input  {email,username, password}
 * @param {*} {user}  {email, username, iat, expIn}
 * @return {
     
    };
 */

const deleteQuestion = async (_, { input }, { req, res }) => {
  return {};
};
const addTopic = async (_, { input }, { req, res }) => {
  return {};
};

const addSubTopic = async (_, { input }, { req, res }) => {
  return {};
};
const editTopic = async (_, { input }, { req, res }) => {
  return {};
};

const deleteTopic = async (_, { input }, { req, res }) => {
  return {};
};
const editSubTopic = async (_, { input }, { req, res }) => {
  return {};
};
const deleteSubTopic = async (_, { input }, { req, res }) => {
  return {};
};

/**
 *Question Graphql Queries
getQuestionById(_id: ID!): Question!
getAllQuestions: [Question!]!
getAllQuestionsByTopic(topic: String): [Question!]!
getAllQuestionsBySubTopic: [Question!]!
getAllQuestionsComplexityLevel: [Question!]!
getRondomQuestion: Question!
getRondomQuestions: [Question!]!
getAllTopics: [Topic!]!
getAllSubTopics: [SubTopic!]!
 */
/**
 *
 * @param {*} _
 * @param {*} args
 * @param {*} param2
 * @param {*} info
 *  getQuestionById,
    getAllQuestions,
    getAllQuestionsByTopic,
    getAllQuestionsBySubTopic,
    getAllQuestionsComplexityLevel,
    getRondomQuestion,
    getRondomQuestions,
    getAllTopics,
    getAllSubTopics
 */
const getQuestionById = async (_, args, { req, res }, info) => {
  return user;
};
const getAllQuestions = async (_, args, { req, res }, info) => {
  return user;
};
const getAllQuestionsByTopic = async (_, args, { req, res }, info) => {
  return user;
};
const getAllQuestionsBySubTopic = async (_, args, { req, res }, info) => {
  return user;
};
const getAllQuestionsComplexityLevel = async (_, args, { req, res }, info) => {
  return user;
};
const getRondomQuestion = async (_, { username }) => {
  const user = await UserModel.findOne({ username }).select("-password");

  return user;
};
const getRondomQuestions = async (_, { _id }) => {
  if (!isValidObjectId(_id)) throw new Error(`${_id} is Invalid user id`);
  const user = await UserModel.findOne({ _id }).select("-password");
  if (!user) throw new Error("No user found");
  console.log({ user });
  // console.log({ ...user.doc });
  return user;
};
const getAllTopics = async (_, { username }) => {
  const user = await UserModel.findOne({ username }).select("-password");

  return user;
};
const getAllSubTopics = async (_, { username }) => {
  const user = await UserModel.findOne({ username }).select("-password");

  return user;
};

const questionResolvers = {
  Query: {
    getQuestionById,
    getAllQuestions,
    getAllQuestionsByTopic,
    getAllQuestionsBySubTopic,
    getAllQuestionsComplexityLevel,
    getRondomQuestion,
    getRondomQuestions,
    getAllTopics,
    getAllSubTopics
  },
  Mutation: {
    addQuestion,
    editQuestion,
    deleteQuestion,
    addTopic,
    addSubTopic,
    editTopic,
    deleteTopic,
    editSubTopic,
    deleteSubTopic
  }
};
export { questionResolvers };
