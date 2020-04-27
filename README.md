# ltmath-server

<div align="center">

### Simple, powerful online communities.

</div>

This is the main monorepo codebase of [ltMath](https://ltmathn.herokuapp.com). Every single line of code that's not packaged into a reusable library is in this repository.

## What is ltMath?

It is a step by step math solution provider.

### Status

ltMath is a personal project and it's in progress for its full features.

### Codebase

#### Technologies

With the ground rules out of the way, let's talk about the coarse architecture of this repo:

- **Full-stack JavaScript**: We use Node.js, Apollo-Server-Express to power our servers, and React to power our frontend apps. Almost all of the code you'll touch in this codebase will be JavaScript.

Here is a list of all the big technologies we use:

- **MongoDB**: Data storage
- **Mongoose**: as ODM
- **Nodejs**: http server
- **ExpressJs**: Apollo sever integration
- **Apollo-Server**: GraphQL Sever
- **GraphQL**: API, powered by the entire Apollo
- **ES6**: Modern JavaScript
- **React**: Frontend React app
- **React Apollo Client**: Frontend React app

#### Folder structure

```sh
src/
│   app.js # GraphQL API Apollo Server
│
├───graphql
│   ├───resolvers
│   │       index.js
│   │       question.js
│   │       subject.js
│   │       topic.js
│   │       user.js
│   │
│   └───typedefs
│           index.js
│           question.js
│           subject.js
│           topic.js
│           user.js
│
├───middleware
│       authenticate.js
│       validateTokens.js
│
├───models
│       ExamModel.js
│       QuestionModel.js
│       SubjectModel.js
│       SubTopicModel.js
│       TopicModel.js
│       UserModel.js
│
└───utils
        authenticate.js
        context.js
        db.js
        topicTree.js
        validateUserInput.js
```

### First time setup

The first step to running ltMath locally is downloading the code by cloning the repository:

```sh
git clone https://github.com/tesfanur/ltmath-server.git
git clone https://github.com/tesfanur/ltmath-client.git

then run npm install the depenecies by going into the root folder for the respective repo
```

#### Installation

### Running the app locally

#### Background services

Whenever you want to run ltMath locally you have to have MongodbDB and Nodejs running in the background.
