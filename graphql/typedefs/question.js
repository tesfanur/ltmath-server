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
  Topic of question
  """
  type Topic {
    _id: Int!
    description: String!
  }
  """
  Sub Topic of question
  """
  type SubTopic {
    _id: Int!
    description: String!
  }
  """
  List of all multiple Choices
  """
  type Choice {
    choiceA: String
    choiceB: String
    choiceC: String
    choiceD: String
    choiceE: String
  }
  """
  Question type def
  """
  type Question {
    _id: ID!
    questionNumber: String!
    description: String!
    topic: String! #Should be taken from selection option from user
    subtopic: String! #Should also be taken from selection option from user
    complexityLevel: complexityLevel!
    multipleChoice: Choice
    imageUrl: String
    answer: String
    explanation: String
    addedBy: ID!
  }
  input QuestionInput {
    questionNumber: String!
    description: String!
    topic: String! #Should be taken from selection option from user
    subtopic: String! #Should also be taken from selection option from user
    complexityLevel: complexityLevel!
    multipleChoice: ID
    imageUrl: String
    answer: String
    explanation: String
  }

  input TopicInput {
    _id: Int!
    description: String!
  }
  input SubTopicInput {
    _id: Int!
    description: String!
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
    getAllQuestionsBySubTopic: [Question!]!
    """
    returns all available question by complexity Level
    """
    getAllQuestionsComplexityLevel: [Question!]!
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
    """
    get random questions
    """
    getAllTopics: [Topic!]!
    """
    get random questions
    """
    getAllSubTopics: [SubTopic!]!
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
    deleteQuestion(input: ID): Question
    """
    add topic
    """
    addTopic(input: TopicInput): Topic
    """
    edit topic
    """
    editTopic(input: TopicInput): Topic
    """
    delete topic
    """
    deleteTopic(input: TopicInput): Topic
    """
    add sub topic
    """
    addSubTopic(input: SubTopicInput): SubTopic
    """
    edit sub topic
    """
    editSubTopic(input: SubTopicInput): SubTopic
    """
    delete sub topic
    """
    deleteSubTopic(input: SubTopicInput): SubTopic
  }
`;

export { questionTypedefs };
