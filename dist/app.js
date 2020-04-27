"use strict";

var _regeneratorRuntime = require("regenerator-runtime");

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _helmet = require("helmet");

var _helmet2 = _interopRequireDefault(_helmet);

var _compression = require("compression");

var _compression2 = _interopRequireDefault(_compression);

var _apolloServerExpress = require("apollo-server-express");

var _typedefs = require("./graphql/typedefs");

var _typedefs2 = _interopRequireDefault(_typedefs);

var _resolvers = require("./graphql/resolvers");

var _resolvers2 = _interopRequireDefault(_resolvers);

var _db = require("./utils/db");

var _db2 = _interopRequireDefault(_db);

var _context = require("./utils/context");

var _context2 = _interopRequireDefault(_context);

var _UserModel = require("./models/UserModel");

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import 3rd party modules
require("make-promises-safe");

require("regenerator-runtime/path").path;
//import local modules
//https://medium.com/@kimtnguyen/how-to-deploy-es6-node-js-express-back-end-to-heroku-7e6743e8d2ff
//   "start": "nodemon ./app.js --exec babel-node -e js",
//refer the following link to deploy es6 nodejs app
//https://www.jaygould.co.uk/2017-11-14-cloud-deployment-heroku-node-babel/

global.contextCallCounter = 0;
// import morgan from "morgan";
// import { validateTokensMiddleware } from "./middleware/validateTokens.js";
// console.log({ validateTokensMiddleware });
_dotenv2.default.config();
var SECRET_KEY = process.env.SECRET_KEY;

var PORT = process.env.PORT;
//TODO: use body-parser middleware so that you can grab user post input
//TODO: write middlware that allows users to login either with their email or username along with their password
//TODO: download robo 3t for mongodb gui application for your database management
(0, _db2.default)();
//instantiate express server app
var app = (0, _express2.default)();
//apply middlewares
app.use((0, _helmet2.default)());
app.use((0, _compression2.default)());
// app.use(morgan("combined", { stream: accessLogStream }));
// app.use(cors(corsOpt));
// const corsOpt = {
//   origin: "https://ltmathra.herokuapp.com/", //http://localhost:5000/graphql
//   credentials: true,
// };
//origin: `https://cors-anywhere.herokuapp.com` + process.env.FRONTEND_URL,
var FRONTEND_URL = "https://ltmathra.herokuapp.com/";
var corsOpt = {
  origin: process.env.FRONTEND_URL || FRONTEND_URL,
  credentials: true // <-- REQUIRED backend setting
};
// app.use(cors(corsOpt));
app.use((0, _cors2.default)({ origin: "*", credentials: true }));
app.use(_express2.default.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.send({ message: "welcome to ltmath!" });
});
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
//   );
//   next();
// });
// To support URL-encoded bodies
app.use(_bodyParser2.default.urlencoded({ extended: true }));
//TODO: DECIDE WHEN TO YOU USE COOKIE AND SESSION FOR YOUR APP,req
// To parse cookies from the HTTP Request
app.use((0, _cookieParser2.default)());
//use session to stoke token
app.use((0, _expressSession2.default)({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: false
}));
//add middleware for the following
// app.use(validateTokensMiddleware);
// disable the x-powered-by header so we don't leak our architecture
app.disable("X-Powered-By");
//intialize apollo server
var apolloServer = new _apolloServerExpress.ApolloServer({
  // cors: {
  //   origin: "*", // <- allow request from all domains
  //   credentials: true,
  // }, // <- enable CORS response for requests with credentials (cookies, http authentication),
  typeDefs: _typedefs2.default,
  resolvers: _resolvers2.default,
  context: function context(_ref) {
    var req = _ref.req,
        res = _ref.res;
    return { req: req, res: res };
  },
  formatError: function formatError(err) {
    // Don't give the specific errors to the client.    if (err.message.startsWith("Database Error: ")) {      return new Error('Internal server error');    }        // Otherwise return the original error.  The error can also    // be manipulated in other ways, so long as it's returned.
    return err;
  }
});

// apolloServer.applyMiddleware({ app, path: "/", cors: false });
apolloServer.applyMiddleware({
  app: app,
  path: "/graphql"
  // cors: false, // disables the apollo-server-express cors to allow the cors middleware use
});

//======
app.listen(PORT || process.env.PORT, function (error) {
  if (error) Error(error);
  console.log("\uD83D\uDE80 apolloServer ready at http://localhost:" + (PORT || process.env.PORT) + apolloServer.graphqlPath);
});

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at http://localhost:${url}`);
// });