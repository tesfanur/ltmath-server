import { gql } from "apollo-server-express";
//TODO: add documentation for each query, resolver, etc
//using triple double quote """Resolved description """
//Subject/Course type definition
const subTopicTypedefs = gql`
  """
  SubTopic
  """
  type SubTopic {
    _id: ID!
    topicId: ID!
    SubTopicName: String!
  }

  extend type Query {
    """
    get all SubTopics
    """
    getAllSubTopics: [SubTopic!]!
  }
  extend type Mutation {
    """
    add SubTopic
    """
    addSubTopic(SubTopicName: String): SubTopic
    """
    edit SubTopic
    """
    editSubTopic(SubTopicName: String): SubTopic
    """
    delete SubTopic
    """
    deleteSubTopic(SubTopicName: String): SubTopic
  }
`;

export { subTopicTypedefs };
