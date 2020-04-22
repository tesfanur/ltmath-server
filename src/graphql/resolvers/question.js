import mongoose from "mongoose";
import QuestionModel from "./../../models/QuestionModel";
import TopicModel from "../../models/TopicModel";
import topicTree from "../../utils/topicTree";
const isValidObjectId = (_id) => mongoose.Types.ObjectId.isValid(_id);
/**
 *
 * @param {*} _ parent object enclosing the resolver
 * @param {*} input {email,username, password}
 */

const addQuestion = async (_, { input }, { req, res }) => {
  //get current user so that you can add who created the question
  //on the way check if the use is admin
  //destructure user input
  const {
    questionNumber,
    description,
    subTopicId,
    complexityLevel,
    multipleChoice,
    imageUrl,
    answer,
    explanation,
    addedBy,
  } = input;

  const newQuestion = new QuestionModel({
    questionNumber,
    description,
    subTopicId,
    complexityLevel,
    multipleChoice,
    imageUrl,
    answer,
    explanation,
    addedBy,
  });
  await newQuestion.save();
  return newQuestion;
};
const editQuestion = async (_, { input }, { req, res }) => {
  let { _id, description } = input;
  //destructure user input
  let updatedQuestion;
  try {
    updatedQuestion = await QuestionModel.findOneAndUpdate(
      { _id },
      { description }
    );
  } catch (error) {
    throw Error("Unable to update sub topic");
  }
  return updatedQuestion;
};
/**
 *
 * @param {*} _id
 * @param {*} param1
 * @param {*} param2
 */
const deleteQuestion = async (_, { _id }, { req, res }) => {
  console.log({ _id });
  if (!isValidObjectId(_id)) throw Error("Invalid question id");
  let question;
  try {
    question = await QuestionModel.findOneAndDelete({ _id });
    console.log({ question });
  } catch (error) {
    throw Error("Something went wrong!");
  }

  return question;
};
/**
 *
 * @param {*} _
 * @param {*} param1
 * @param {*} param2
 */

const getQuestionById = async (_, { _id }, { req, res }) => {
  if (!isValidObjectId(_id)) throw Error("Invalide question id");
  const question = await QuestionModel.findById(_id);
  return question;
};
const getAllQuestions = async (_, args) => {
  const questions = await QuestionModel.find();
  if (!questions) throw Error("No question found");
  return questions;
};
const getAllQuestionsByTopic = async (_, { topic }, { req, res }) => {
  if (!topic) throw Error("User input error");
  const questions = await QuestionModel.find({ topic });
  if (!questions) throw Error("No question found");
  return questions;
};
const getAllQuestionsBySubTopic = async (_, { subtopic }, { req, res }) => {
  if (!subtopic) throw Error("User input error");
  const questions = await QuestionModel.find({ subtopic });
  if (!questions) throw Error("No question found");
  return questions;
};
const getAllQuestionsComplexityLevel = async (_, { complexityLevel }) => {
  if (!complexityLevel) throw Error("User input error");
  const questions = await QuestionModel.find({ complexityLevel });
  if (!questions) throw Error("No question found");
  return questions;
};
/**
 * @param {*} _
 * @param {*} args
 */
const getRondomQuestion = async (_, args) => {
  const questions = await QuestionModel.find();
  if (!questions) throw Error("No question found");
  const length = questions.length;
  if (length > 1) return questions[Math.floor(Math.random() * length)];
  throw Error("No question found");
};
/**
 * @param {*} _
 * @param {*} args
 */
const getRondomQuestions = async (_, args) => {
  //TODO: limit the number of questions to be returned
  const questions = await QuestionModel.find();

  if (!questions) throw Error("No question found");
  const length = questions.length;
  if (length <= 1) return questions;
  const numberOfRandomQuestions = Math.floor(Math.random() * length);
  console.log({ numberOfRandomQuestions });
  let tempRandomQuestionArray = [];
  for (let i = 0; i < numberOfRandomQuestions; i++) {
    tempRandomQuestionArray.push(questions[i]);
  }
  return tempRandomQuestionArray;
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
  },
  Mutation: {
    addQuestion,
    editQuestion,
    deleteQuestion,
  },
};
//TODO: add insert many collection at a time for subject, topic, subtopic and others too
//TODO:include text search for each field search by topic search by subtopic...
export { questionResolvers };
