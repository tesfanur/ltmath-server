import { gql } from "apollo-server-express";

//TODO: add documentation for each query, resolver, etc
//using triple double quote """Resolved description """

const userTypedefs = gql`
  #  fragment UserDetails on User{
  #     username: String
  #     email: String
  #     usertype: UserType = STUDNET
  #   }
  enum UserType {
    STUDENT
    PARENT
    TEACHER
    AUTHOR
    ADMIN
  }
  """
  Response type for user login and signin
  """
  type User {
    _id: String
    username: String!
    email: String!
    token: String!
    usertype: UserType
    createdAt: String
    updatedAt: String
  }
  """
  User registration input type
  """
  type Token {
    token: String
  }
  """
  User registration input type
  """
  input userRegistrationInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
    usertype: UserType = STUDNET
  }
  """
  User signin input type
  """
  input userSigninInput {
    username: String
    password: String
  }
  # """
  # User signin response type
  # """
  # type signinResponse {
  #   successMessage: String
  #   usertype: UserType
  #   username: String
  #   email: String
  #   token: String
  #   _id: String
  # }

  type Query {
    """
    finds currently loggedin user
    """
    currentUser: User!
    """
    authentication error message
    """
    authenticationError: String
    """
    finds list of all users
    """
    users: [User!]!
    """
    find user by email
    """
    getUserByEmail(email: String): User!
    """
    find user by username
    """
    getUserByUsername(username: String): User!
    """
    find user by user id
    """
    getUserByID(userId: ID): User!
  }
  type Mutation {
    """
    singnup by user
    """
    signup(input: userRegistrationInput): User
    """
    signin user
    """
    signin(input: userSigninInput): User
    """
    delete user
    """
    deleteUserById(userId: ID): User
  }
`;

export { userTypedefs };
