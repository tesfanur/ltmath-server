import { gql } from "apollo-server-express";
//TODO: add documentation for each query, resolver, etc
//using triple double quote """Resolved description """
//Math question type definition
const questionTypedefs = gql`
  """
  Subject
  """
  type Subject {
    _id: ID!
    subjectName: String
  }
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
    topic: String! #Should be taken from selection option from user
    subtopic: String! #Should also be taken from selection option from user
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
    topic: String! #Should be taken from selection option from user
    subtopic: String! #Should also be taken from selection option from user
    complexityLevel: complexityLevel!
    multipleChoice: [ChoiceInput!]!
    imageUrl: String
    answer: String
    explanation: String
  }

  extend type Query {
    """
    finds subject by id
    """
    getSubjectById(_id: ID!): Subject!
    """
    finds all subject
    """
    getAllSubjects: [Subject]!
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
    """
    get random questions
    """
    getAllTopics: [Topics]
    """
    get Topic by id
    """
    getTopicById(_id: ID): Topic
    """
    get random questions
    """
    getAllSubTopics(topicId: ID): [SubTopics]!
  }
  extend type Mutation {
    """
    add Subject
    """
    addSubject(subjectName: String): Subject
    """
    edit Subject
    """
    editSubject(_id: ID): Subject
    """
    delete Subject
    """
    deleteSubject(_id: ID): Subject

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
    """
    add topic
    """
    addTopic(topicNameArr: [TopicInput], subjectId: ID): Topics
    """
    edit topic
    """
    editTopic(topicName: String): Topic
    """
    delete topic
    """
    deleteTopic(topicName: String): Topic
    """
    add sub topic
    """
    addSubTopic(subTopicNameArr: [SubTopicInput], topicId: ID): [SubTopics]
    """
    edit sub topic
    """
    editSubTopic(description: String): SubTopic
    """
    delete sub topic
    """
    deleteSubTopic(description: String): SubTopic
  }
`;

export { questionTypedefs };
