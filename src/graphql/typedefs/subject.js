import { gql } from "apollo-server-express";
//TODO: add documentation for each query, resolver, etc
//using triple double quote """Resolved description """
//Subject/Course type definition
const subjectTypedefs = gql`
  """
  Topic of question
  """
  type Subject {
    _id: Int!
    subjectName: String!
  }

  extend type Query {
    """
    get all Subjects
    """
    getAllSubjects: [Subject!]!
  }
  extend type Mutation {
    """
    add Subject
    """
    addSubject(subjectName: String): Subject
    """
    edit Subject
    """
    editSubject(subjectName: String): Subject
    """
    delete Subject
    """
    deleteSubject(subjectName: String): Subject
  }
`;

export { subjectTypedefs };
