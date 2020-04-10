import mongoose from "mongoose";
import UserModel from "./../../models/UserModel";
import QuestionModel from "./../../models/QuestionModel";
import TopicModel from "../../models/TopicModel";
import SubjectModel from "../../models/SubjectModel";
import SubTopicModel from "../../models/SubTopicModel";
const isValidObjectId = (_id) => mongoose.Types.ObjectId.isValid(_id);
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
  //get current user so that you can add who created the question
  //on the way check if the use is admin
  //destructure user input
  const {
    questionNumber,
    description,
    topic,
    subtopic,
    complexityLevel,
    multipleChoice,
    imageUrl,
    answer,
    explanation,
  } = input;

  const newQuestion = new QuestionModel({
    questionNumber,
    description,
    topic,
    subtopic,
    complexityLevel,
    multipleChoice,
    imageUrl,
    answer,
    explanation,
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

  return null;
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
 */
const addSubject = async (_, { subjectName }) => {
  if (!subjectName) throw Error("User input error");
  const existingSubject = await SubjectModel.findOne({
    subjectName: subjectName.trim(),
  });
  console.log({ existingSubject });
  if (existingSubject) throw Error("This sub Subject already exists");
  const subject = new SubjectModel({ subjectName });
  await subject.save();
  return subject;
};
/**
 *
 * @param {*} _
 * @param {*} param1
 */
const addTopic = async (_, { description }) => {
  if (!description) throw Error("User input error");
  const existingTopic = await TopicModel.findOne({
    description: description.trim(),
  });
  console.log({ existingTopic });
  if (existingTopic) throw Error("This sub topic already exists");
  const topic = new TopicModel({ description });
  await topic.save();
  return topic;
};
/**
 *
 * @param {*} _
 * @param {*} param1
 */
const addSubTopic = async (_, { description }) => {
  //TODO: since only admin user has the right to add sub topics and other writing access
  //check the user role or user type before executing the code below to the database
  if (!description) throw Error("User input error");
  const existingSubtopic = await SubTopicModel.findOne({
    description: description.trim(),
  });
  console.log({ existingSubtopic });
  if (existingSubtopic) throw Error("This sub topic already exists");
  const subTopic = new SubTopicModel({ description });
  await subTopic.save();
  return subTopic;
};
/**
 *
 * @param {*} _
 * @param {*} param1
 */
const editTopic = async (_, { description }) => {
  console.log({ description });
  return {};
};
const deleteTopic = async (_, { _id }, { req, res }) => {
  return {};
};
const editSubTopic = async (_, { _id }, { req, res }) => {
  let updatedSubTopic;
  try {
    updatedSubTopic = await SubTopicModel.findOneAndUpdate(
      { _id },
      { description }
    );
  } catch (error) {
    throw Error("Unable to update sub topic");
  }
  return updatedSubTopic;
};
const deleteSubTopic = async (_, { _id }, { req, res }) => {
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
const getSubjectById = async (_, { _id }, { req, res }) => {
  if (!isValidObjectId(_id)) throw Error("Invalide Subject id");
  const subject = await SubjectModel.findById(_id);
  return subject;
};

const getQuestionById = async (_, { _id }, { req, res }) => {
  if (!isValidObjectId(_id)) throw Error("Invalide question id");
  const question = await QuestionModel.findById(_id);
  return question;
};
const getAllQuestions = async (_, args, { req, res }) => {
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
const getRondomQuestion = async (_, args) => {
  const questions = await QuestionModel.find();
  if (!questions) throw Error("No question found");
  const length = questions.length;
  if (length > 1) return questions[Math.floor(Math.random() * length)];
  throw Error("No question found");
};
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
const getAllTopics = async (_, args) => {
  const topics = await TopicModel.find();
  return topics;
};
const getAllSubTopics = async (_, args) => {
  const subTopics = await SubTopicModel.find();
  return subTopics;
};
const getAllSubjects = async (_, args) => {
  const subjects = await SubjectModel.find();
  return subjects;
};

const questionResolvers = {
  Query: {
    getAllSubjects,
    getSubjectById,
    getQuestionById,
    getAllQuestions,
    getAllQuestionsByTopic,
    getAllQuestionsBySubTopic,
    getAllQuestionsComplexityLevel,
    getRondomQuestion,
    getRondomQuestions,
    getAllTopics,
    getAllSubTopics,
  },
  Mutation: {
    addSubject,
    addQuestion,
    editQuestion,
    deleteQuestion,
    addTopic,
    addSubTopic,
    editTopic,
    deleteTopic,
    editSubTopic,
    deleteSubTopic,
  },
};
//TODO: add insert many collection at a time for subject, topic, subtopic and others too
export { questionResolvers };
