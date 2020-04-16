import { gql } from "apollo-server-express";
//TODO: add documentation for each query, resolver, etc
//using triple double quote """Resolved description """
//Math question type definition
const questionTypedefs = gql`
  """
  Is the complexity level of the question
  """
  enum complexityLevel {
    EASY
    MEDIUM
    HARD
  }
  """
  Is the type of level of the question
  """
  enum typeOfQuestion {
    MULTIPLE_CHOICE
    WORKOUT
    MATCHING
    WORD_PROBLEM
  }
  """
  List of all multiple Choices
  """
  type Choice {
    description: String
  }
  input ChoiceInput {
    description: String
  }
  """
  Question type def
  """
  type Question {
    _id: ID!
    questionNumber: String!
    description: String!
    subTopicId: ID!
    complexityLevel: complexityLevel!
    multipleChoice: [Choice]
    imageUrl: String
    answer: String
    explanation: String
    addedBy: ID!
  }
  input QuestionInput {
    questionNumber: String!
    description: String!
    subTopicId: ID!
    complexityLevel: complexityLevel!
    multipleChoice: [ChoiceInput!]!
    imageUrl: String
    answer: String
    explanation: String
    addedBy: ID
  }

  extend type Query {
    """
    finds question by question id
    """
    getQuestionById(_id: ID!): Question!
    """
    returns all available questions
    """
    getAllQuestions: [Question!]!
    """
    returns all available questions by question topic
    """
    getAllQuestionsByTopic(topic: String): [Question!]!
    """
    returns all available questions by question subtopic
    """
    getAllQuestionsBySubTopic(subtopic: String): [Question!]!
    """
    returns all available question by complexity Level
    """
    getAllQuestionsComplexityLevel(complexityLevel: String): [Question!]!
    """
    get random question
    """
    getRondomQuestion: Question!
    """
    get random questions
    """
    getRondomQuestions: [Question!]!
    #TODO: add the following graphql quesries
    #getRandomQuestionByTopic
    #getRandomQuestionBySubTopic
  }
  extend type Mutation {
    """
    add question into db
    """
    addQuestion(input: QuestionInput): Question
    """
    edit question
    """
    editQuestion(input: QuestionInput): Question
    """
    remove question from db
    """
    deleteQuestion(_id: ID): Question
  }
`;

export { questionTypedefs };
