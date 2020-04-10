import { gql } from "apollo-server-express";
//TODO: add documentation for each query, resolver, etc
//using triple double quote """Resolved description """
//Subject/Course type definition
const topicTypedefs = gql`
  """
  Topic
  """
  type Topic {
    _id: ID!
    subjectId: ID!
    TopicName: String!
  }

  extend type Query {
    """
    get all Topics
    """
    getAllTopics: [Topic!]!
  }
  extend type Mutation {
    """
    add Topic
    """
    addTopic(TopicName: String): Topic
    """
    edit Topic
    """
    editTopic(TopicName: String): Topic
    """
    delete Topic
    """
    deleteTopic(TopicName: String): Topic
  }
`;

export { topicTypedefs };
