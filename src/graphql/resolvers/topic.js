import mongoose from "mongoose";
import TopicModel from "../../models/TopicModel";
import SubjectModel from "../../models/SubjectModel";
import topicTree from "../../utils/topicTree";
const isValidObjectId = (_id) => mongoose.Types.ObjectId.isValid(_id);
/**
 *
 * @param {*} _
 * @param {*} param1
 */
//TODO:refactor the addTopic function in a better way than the following implementation
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
        //add default topics
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

  // console.log({ response: JSON.stringify(response) });
  // console.log({ addedSubTopics: JSON.stringify(addedSubTopics) });
  if (addedSubTopics.length == 0) throw Error("Failed to add subtopics");

  return addedSubTopics;
};
/**
 *
 * @param {*} _
 * @param {*} param1
 */
const findTopicByIdAndUpdate = async (_, { topicId, topicUpdateOption }) => {
  if (!isValidObjectId(topicId)) throw Error("Invalid Topic ID");
  const updatedTopicDocument = await TopicModel.findOneAndUpdate(
    { "topics._id": topicId },
    {
      "topics.$.topic": topicUpdateOption.topic,
    },
    { useFindAndModify: false, new: true }
  );
  if (!updatedTopicDocument) throw Error("Failed to update");
  let updatedTopic;
  if (updatedTopicDocument && updatedTopicDocument.topics.length > 0) {
    updatedTopicDocument.topics.forEach((topic) => {
      if (topic._id.toString() === topicId) updatedTopic = topic;
    });
  }
  if (!updatedTopic) throw Error("Topic update failed");
  return updatedTopic;
};
/**
 *
 * @param {*} _
 * @param {*} param1
 * @param {*} param2
 */
const deleteTopic = async (_, { topicId }, { req, res }) => {
  if (!isValidObjectId(topicId)) throw Error("Invalid Topic ID");
  const updatedTopicDocument = await TopicModel.findOneAndUpdate(
    { "topics._id": topicId },
    {
      $pull: {
        topics: { _id: topicId },
      },
    },
    { useFindAndModify: false, new: true }
  );

  if (!updatedTopicDocument)
    throw Error("No topic found to delete with topic id " + topicId);
  return [updatedTopicDocument];
};
/**
 *
 * @param {*} _
 * @param {*} param1
 * @param {*} param2
 */
const findSubTopicByIdandUpdate = async (
  _,
  { topicId, subTopicId, subTopicUpdateOption }
) => {
  if (!isValidObjectId(subTopicId)) throw Error("Invalid Topic ID");
  const updatedTopicDocument = await TopicModel.findOneAndUpdate(
    {
      "topics._id": topicId,
      "topics.subTopics._id": subTopicId,
    },
    {
      $set: {
        // "topics.$.subTopics.0.subTopic": subTopicUpdateOption.subTopic,
        "topics.$[topic].subTopics.$[subTopic].subTopic":
          subTopicUpdateOption.subTopic,
      },
    },
    {
      useFindAndModify: false,
      new: true,
      arrayFilters: [{ "topic._id": topicId }, { "subTopic._id": subTopicId }],
    }
  );
  console.log({ updatedTopicDocument: JSON.stringify(updatedTopicDocument) });
  if (!updatedTopicDocument) throw Error("Failed to update");
  let updatedTopic;
  if (updatedTopicDocument && updatedTopicDocument.topics.length > 0) {
    updatedTopicDocument.topics.forEach((topic) => {
      if (topic._id.toString() === topicId) updatedTopic = [topic];
    });
  }
  if (!updatedTopic) throw Error("Topic update failed");
  return updatedTopic;
};
/**
 *
 * @param {*} _
 * @param {*} param1
 * @param {*} param2
 */
const deleteSubTopic = async (_, { topicId, subTopicId }) => {
  if (!isValidObjectId(subTopicId)) throw Error("Invalid Topic ID");
  const updatedTopicDocument = await TopicModel.updateOne(
    {
      "topics._id": topicId,
    },
    {
      $pull: {
        "topics.$.subTopics": {
          _id: subTopicId,
        },
      },
    },
    {
      useFindAndModify: false,
      new: true,
    }
  );
  console.log({
    updatedTopicDocument,
  });
  //returns of such type object: { updatedTopicDocument: '{"n":1,"nModified":0,"ok":1}' }
  //or { updatedTopicDocument: '{"n":1,"nModified":1,"ok":1}' }
  if (updatedTopicDocument.nModified > 0)
    console.log(`You have successfully removed subtopic with id ${subTopicId}`);
  else console.log(`Subtopic with id ${subTopicId} doesn't exist`);
  console.log({
    updatedTopicDocument: JSON.stringify(updatedTopicDocument),
  });
  if (!updatedTopicDocument) throw Error("Failed to update");
  let topicDocument = await TopicModel.findOne();
  console.log({
    topicDocumentFromDeleteSubTopicResolver: topicDocument,
  });
  if (!topicDocument) throw Error("No such sub topic found");
  let { topics } = topicDocument;
  let subTopics;
  console.log({
    topics,
  });
  topics.forEach((topic) => {
    if (topic._id.toString() === topicId) {
      subTopics = [topic];
    }
  });

  return subTopics;
};
/**
 *
 * @param {*} _
 * @param {*} args
 */
const getAllTopics = async (_, args) => {
  const topics = await TopicModel.find().populate("subjectId");
  if (topics.length == 0) throw Error("No topic found. Please add topics");
  return topics;
};
/**
 * @param {*} _
 * @param {*} args
 */
const getTopicById = async (_, { topicId }) => {
  console.log({ topicId });
  //https://codelikethis.com/lessons/db/mongodb-array-queries
  if (!isValidObjectId(topicId)) throw Error("Invalid Object ID");
  const topics = await TopicModel.find({ "topics._id": topicId });
  let topicFound;
  if (topics && topics.length > 0) {
    console.log(topics[0]["topics"]);
    topics[0]["topics"].forEach((topic) => {
      if (topic._id.toString() == topicId) topicFound = topic;
    });
  }
  if (!topicFound) throw Error("No topic found");
  return topicFound;
};
/**
 *
 * @param {*} _
 * @param {*} param1
 */
const getSubTopicById = async (_, { topicId, subTopicId }) => {
  console.log({ subTopicId });
  if (!isValidObjectId(subTopicId)) throw Error("Invalid Object ID");
  const topics = await TopicModel.findOne({
    "topics._id": topicId,
    // "topics.subTopis._id": subTopicId,
  });
  console.log({
    topics: JSON.stringify(topics),
    length: topics.topics.length,
    topicstopics: topics.topics,
  });
  let topicFound;
  if (topics) {
    // console.log(topics[0]["topics"]);
    topics.topics.forEach((topic) => {
      console.log({ topic: JSON.stringify(topic) });
      console.log({
        topicsubTopicsidsubTopic: topic.subTopics.id(subTopicId),
      });
      // if (topic._id.toString() == topicId) topicFound = [topic];
      // if (topic.subTopics.id(subTopicId)) topicFound = [topic];
      if (topic.subTopics.id(subTopicId))
        topicFound = topic.subTopics.id(subTopicId);
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
  let { topics } = topicDocument;
  let subTopics;
  topics.forEach((topic) => {
    if (topic._id.toString() === topicId) {
      subTopics = [topic];
    }
  });
  return subTopics;
};

const topicResolvers = {
  Query: {
    getAllTopics,
    getTopicById,
    //subtopic sub domain
    getAllSubTopics,
    getSubTopicById,
  },
  Mutation: {
    //topic sub domain
    addTopic,
    findTopicByIdAndUpdate,
    deleteTopic,
    //subtopic sub domain
    addSubTopic,
    findSubTopicByIdandUpdate,
    deleteSubTopic,
  },
};
//TODO: add insert many collection at a time for subject, topic, subtopic and others too
//TODO:include text search for each field search by topic search by subtopic...
export { topicResolvers };
