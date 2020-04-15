import mongoose, { mongo } from "mongoose";

import UserModel from "./../../models/UserModel";
import QuestionModel from "./../../models/QuestionModel";
import TopicModel from "../../models/TopicModel";
import SubjectModel from "../../models/SubjectModel";
import SubTopicModel from "../../models/SubTopicModel";
import topicTree from "../../utils/topicTree";
// console.log({ topicTree: JSON.stringify(topicTree) });
// topicTree.forEach((topic, i) => {
//   console.log({ i: i + 1, topic: JSON.stringify(topic) });
// });
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
const addTopic = async (_, { topicNameArr, subjectId }) => {
  const isValidSubjectId = isValidObjectId(subjectId);
  const ExistsInSubjColl = await SubjectModel.findById(subjectId);
  const subjectExistsInTopicColl = await TopicModel.findOne({ subjectId });

  // topicNameArr.forEach((topic) => {
  //   let testTopic = new TopicSubDocument(topic);
  //   testTopic.save();
  // });
  const topics = topicNameArr;

  let topicExist = await TopicModel.findOne({
    "topics.topic": topics[0].topic,
  });
  if (topicExist) {
    console.log("Topic Already exisits");
    throw Error("Topic Already exisits");
  }
  console.log({
    topicExist: JSON.stringify(topicExist),
    topic: topics[0].topic,
    topics,
  });
  let topic;
  if (ExistsInSubjColl) {
    const subjId = ExistsInSubjColl._id.toString();
    if (!subjectExistsInTopicColl && isValidSubjectId) {
      console.log({ subjectId, topics });

      try {
        topic = new TopicModel({
          subjectId: subjId,
          topics: topics,
        });

        await topic.save();
        // console.log({ topic: JSON.stringify(topic) });
        console.log({ test1: `test1` });
        return topic;
      } catch (error) {
        console.log({ test2: `test2` });
        console.log({ exc: error });
      }
    }
    // console.log({ test3: `test3` });
    console.log({ subjectExistsInTopicColl: subjectExistsInTopicColl.topics });
    console.log({ topicsTobeAdded: topics });
    subjectExistsInTopicColl.topics.push({ $each: topics, $position: 0 });
    return await subjectExistsInTopicColl.save();
  } else {
    if (!subjectExistsInTopicColl && isValidSubjectId) {
      // console.log({ subjectId, topics });
      try {
        console.log({ test4: `test4` });
        topic = new TopicModel({ subjectId, topics: topics });
        await topic.save();
        // console.log({ topic: JSON.stringify(topic) });
        return topic;
      } catch (error) {
        console.log({ test5: `test5` });
        console.log({ error });
      }
    }
  }
};
/**
 *
 * @param {*} _
 * @param {*} param1
 */
const addSubTopic = async (_, { subTopicNameArr, topicId }) => {
  const isValidTopicId = isValidObjectId(topicId);
  if (!isValidTopicId) throw Error("Invalid Topic Id");
  const topicDocument = await TopicModel.findOne({
    "topics._id": topicId,
  });
  let subTopicsTobeAdded = [...subTopicNameArr];
  let uniqueSubTopics = [];
  if (!topicDocument) throw Error("No Topic Found. Please add the top first!");
  // console.log({
  //   topicDocumentTopics: JSON.stringify(topicDocument.topics),
  // });
  // const subTopics = subTopicNameArr;
  // let iteratationCount = 0;
  console.log({
    treeLength: topicTree.length,
    length: topicDocument.topics.length,
  });

  let topicName,
    addedSubTopics = [];
  topicDocument.topics.forEach((existingTopic) => {
    //show all ids of the topic
    // topicTree.forEach((topicFromTopicTree) => {
    //   if (existingTopic.topic == topicFromTopicTree.topic.trim()) {
    //     //default sub topics to add
    //     if (existingTopic && existingTopic.subTopics.length === 0)
    //       existingTopic.subTopics.push(...topicFromTopicTree.subTopics);
    //   }
    // });

    if (existingTopic._id.toString() === topicId) {
      // if (topic.subTopics.length === 0)
      //modify this code to add the incoming subtopics in their proper
      //topic
      // topic.subTopics.push(...subTopicNameArr);
      //check if subtopic already exists
      topicName = existingTopic.topic;
      let existingSubTopics = [
        ...new Set(
          existingTopic.subTopics.map((subtopic) => subtopic.subTopic)
        ),
      ];
      console.log({ existingSubTopics });
      // subTopicsTobeAdded = topic;
      console.log({ existingTopic });
      subTopicsTobeAdded.forEach((sTopic) => {
        console.log(
          `existingSubTopics.includes(sTopic.subTopic) ` +
            existingSubTopics.includes(sTopic.subTopic)
        );
        if (existingSubTopics.includes(sTopic.subTopic))
          throw Error(`"${sTopic.subTopic}" sub topic already exists!`);
        console.log({ subtopicToBeAdded: sTopic });
        existingTopic.subTopics.push(sTopic);
        // await topicDocument.save();
        // addedSubTopics.push(existingTopic.subTopics.slice(-1));
        addedSubTopics = [existingTopic];
      });

      uniqueSubTopics = [
        ...new Set(
          existingTopic.subTopics.map((subtopic) => subtopic.subTopic)
        ),
      ];
    }
  });

  await topicDocument.save();
  // console.log({ topicDocument: JSON.stringify(topicDocument) });
  // console.log({ topics: JSON.stringify(topicDocument.topics) });
  // console.log({ topicDocument: JSON.stringify(topicDocument) });
  // let { topics } = topicDocument;
  // console.log({ topics });
  let response = {
    subTopics: addedSubTopics,
    _id: topicId,
    topic: topicName,
  };

  console.log({ response: JSON.stringify(response) });
  console.log({ addedSubTopics: JSON.stringify(addedSubTopics) });
  if (!subTopicsTobeAdded) throw Error("Failed to add subtopics");
  console.log({
    subTopicsTobeAdded,
    uniqueSubTopics,
    topic: [{ subTopics: addedSubTopics }],
  });
  return addedSubTopics;
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
/**
 *
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
 *
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
/**
 *
 * @param {*} _
 * @param {*} args
 */
const getAllTopics = async (_, args) => {
  const topics = await TopicModel.find().populate("subjectId");
  if (topics.length == 0) throw Error("No topic found. Please add topics");
  console.log({ topics: JSON.stringify(topics) });

  topics[0].topics.forEach(({ topic }) => {
    console.log({ topic });
  });

  return topics;
};
//
/**
 *
 * @param {*} _
 * @param {*} args
 */
const getTopicById = async (_, { _id }) => {
  console.log({ _id });
  //https://codelikethis.com/lessons/db/mongodb-array-queries
  if (!isValidObjectId(_id)) throw Error("Invalid Object ID");
  const topics = await TopicModel.find({ "topics._id": _id });
  let topicFound;
  if (topics && topics.length > 0) {
    console.log(topics[0]["topics"]);
    topics[0]["topics"].forEach((topic) => {
      if (topic._id == _id) topicFound = topic;
    });
  }
  if (!topicFound) throw Error("No topic found");
  return topicFound;
};
/**
 *
 * @param {*} _
 * @param {*} args
 */
const getAllSubTopics = async (_, { topicId }) => {
  if (!isValidObjectId(topicId)) throw Error(`Invalid id: ${topicId}`);
  const topicDocument = await TopicModel.findOne({ "topics._id": topicId });
  if (!topicDocument) throw Error(`No topic found with id: ${topicId}`);
  console.log({ topicDocument });
  /**
   * https://www.initialapps.com/mongoose-why-you-may-be-having-issues-populating-across-multiple-levels/
   * http://frontendcollisionblog.com/mongodb/2016/01/24/mongoose-populate.html
   * {
    path: "subjectId",
    model: "Subject",
    populate: {
      path: "topicId",
      model: "Topic",
    },
  }
   */
  // .populate("subjectId")
  // .populate("topicId");
  // console.log({
  //   topics: JSON.stringify(topicDocument.topics),
  // });
  let { topics } = topicDocument;
  let subTopics;
  topics.forEach((topic) => {
    if (topic._id.toString() === topicId) {
      subTopics = [topic];
    }
  });
  console.log({
    topics: JSON.stringify(topics),
    subTopics: JSON.stringify(subTopics),
  });
  // return { topic: topics["topic"], subTopics: subTopics.subTopics };
  return subTopics;
};
/**
 *
 * @param {*} _
 * @param {*} args
 */
const getAllSubjects = async (_, args) => {
  const subjects = await SubjectModel.find();
  return subjects;
};

const questionResolvers = {
  Query: {
    //subject sub domain
    getAllSubjects,
    getSubjectById,
    //question sub domain
    getQuestionById,
    getAllQuestions,
    getAllQuestionsByTopic,
    getAllQuestionsBySubTopic,
    getAllQuestionsComplexityLevel,
    getRondomQuestion,
    getRondomQuestions,
    //topic sub domain
    getAllTopics,
    getTopicById,
    //subtopic sub domain
    getAllSubTopics,
  },
  Mutation: {
    //subject sub domain
    addSubject,
    //question sub domain
    addQuestion,
    editQuestion,
    deleteQuestion,
    //topic sub domain
    addTopic,
    editTopic,
    deleteTopic,
    //subtopic sub domain
    addSubTopic,
    editSubTopic,
    deleteSubTopic,
  },
};
//TODO: add insert many collection at a time for subject, topic, subtopic and others too
export { questionResolvers };
