import { gql } from "apollo-server-express";
//TODO: add documentation for each query, resolver, etc
//using triple double quote """Resolved description """
//Math question type definition
const topicTypedefs = gql`
  """
  Topic of question
  """
  type Topic {
    _id: ID
    topic: String
  }
  """
  Topic of question
  """
  type Topics {
    _id: ID!
    subjectId: ID!
    topics: [Topic]!
  }
  """
  Topic Input
  """
  input TopicInput {
    topic: String!
  }
  """
  Sub Topic Input
  """
  input SubTopicInput {
    subTopic: String!
  }
  """
  Topic of question
  """
  type SubTopic {
    _id: ID!
    subTopic: String!
  }

  """
  Sub Topic of question
  """
  type SubTopics {
    _id: ID!
    topic: ID
    subTopics: [SubTopic]
  }

  extend type Query {
    """
    get all topics
    """
    getAllTopics: [Topics]
    """
    get Topic by id
    """
    getTopicById(topicId: ID): Topic
    """
    get random questions
    """
    getAllSubTopics(topicId: ID): [SubTopics]!
    """
    get sub topic by id
    """
    getSubTopicById(topicId: ID, subTopicId: ID): SubTopic
    # [SubTopics]!
  }
  extend type Mutation {
    """
    add topic
    """
    addTopic(topicNameArr: [TopicInput], subjectId: ID): Topics
    """
    edit topic
    """
    findTopicByIdAndUpdate(topicId: ID, topicUpdateOption: TopicInput): Topic
    """
    delete topic
    """
    deleteTopic(topicId: ID): [Topics]
    """
    add sub topic
    """
    addSubTopic(subTopicNameArr: [SubTopicInput], topicId: ID): [SubTopics]
    """
    edit sub topic
    """
    findSubTopicByIdandUpdate(
      topicId: ID
      subTopicId: ID
      subTopicUpdateOption: SubTopicInput
    ): [SubTopics]
    """
    delete sub topic
    """
    deleteSubTopic(topicId: ID, subTopicId: ID): [SubTopics]
  }
`;

export { topicTypedefs };
