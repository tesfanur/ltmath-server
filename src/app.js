//import 3rd party modules
import regeneratorRuntime from "regenerator-runtime";
require("regenerator-runtime/path").path;
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import { ApolloServer } from "apollo-server-express";
//import local modules
//https://medium.com/@kimtnguyen/how-to-deploy-es6-node-js-express-back-end-to-heroku-7e6743e8d2ff
//   "start": "nodemon ./app.js --exec babel-node -e js",
//refer the following link to deploy es6 nodejs app
//https://www.jaygould.co.uk/2017-11-14-cloud-deployment-heroku-node-babel/
import typeDefs from "./graphql/typedefs";
import resolvers from "./graphql/resolvers";
import connectToDB from "./utils/db";
import context from "./utils/context";
import UserModel from "./models/UserModel";
global.contextCallCounter = 0;
// import morgan from "morgan";
// import { validateTokensMiddleware } from "./middleware/validateTokens.js";
// console.log({ validateTokensMiddleware });
dotenv.config();
const { SECRET_KEY } = process.env;
const PORT = process.env.PORT;
const corsOpt = {
  origin: "*", //http://localhost:5000/graphql
  credentials: true,
};

//define how to write log messages into a file
// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, "access.log"),
//   { flags: "a" }
// );

//TODO: use body-parser middleware so that you can grab user post input
//TODO: write middlware that allows users to login either with their email or username along with their password
//TODO: download robo 3t for mongodb gui application for your database management
connectToDB();
// //intialize apollo server
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context
// });
//instantiate express server app
const app = express();
//apply middlewares
app.use(helmet());
app.use(compression());
// app.use(morgan("combined", { stream: accessLogStream }));
// app.use(cors(corsOpt));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send({ message: "welcome to ltmath!" });
});
// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//TODO: DECIDE WHEN TO YOU USE COOKIE AND SESSION FOR YOUR APP,req
// To parse cookies from the HTTP Request
app.use(cookieParser());
//use session to stoke token
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
//add middleware for the following
// app.use(validateTokensMiddleware);
// disable the x-powered-by header so we don't leak our architecture
app.disable("X-Powered-By");
//intialize apollo server
const apolloServer = new ApolloServer({
  cors: {
    credentials: true,
    origin: (origin, callback) => {
      const whitelist = [
        "https://ltmathra.herokuapp.com",
        "https://ltmathra2.herokuapp.com",
      ];

      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  },
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

// apolloServer.applyMiddleware({ app, path: "/", cors: false });
apolloServer.applyMiddleware({ app }); //disables the a-s-e cors to allow the cors middleware

app.listen(PORT || process.env.PORT, (error) => {
  if (error) Error(error);
  console.log(
    `🚀 apolloServer ready at http://localhost:${PORT || process.env.PORT}${
      apolloServer.graphqlPath
    }`
  );
});

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at http://localhost:${url}`);
// });
