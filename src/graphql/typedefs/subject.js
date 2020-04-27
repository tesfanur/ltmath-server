import { gql } from "apollo-server-express";
//TODO: add documentation for each query, resolver, etc
//using triple double quote """Resolved description """
//Math subject type definition
const subjectTypedefs = gql`
  """
  Subject
  """
  type Subject {
    _id: ID!
    subjectName: String
  }
  """
  Subject Input
  """
  input SubjectInput {
    subjectName: String!
  }
  extend type Query {
    """
    finds subject by id
    """
    getSubjectById(subjectId: ID!): Subject!
    """
    finds all subject
    """
    getAllSubjects: [Subject]!
  }
  extend type Mutation {
    """
    add Subject
    """
    addSubject(subjectName: String): Subject
    # deleteSubject
    """
    add Subject
    """
    deleteSubject(subjectId: ID): Subject

    """
    edit Subject
    """
    findSubjectByIdAndUpdate(
      subjectId: ID
      subjectUpdateOption: SubjectInput
    ): Subject
  }
`;

export { subjectTypedefs };
