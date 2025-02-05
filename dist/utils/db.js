"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var DB_URI_PROD = "mongodb://tesfa:Tesfanur#234@ds259577.mlab.com:59577/ltmath";

var DB_CONNECTION = process.env.DB_CONNECTION || process.env.DB_URI_PROD;
// DB_CONNECTION = process.env.DB_CONNECTION; //`mongodb+srv://tesfanur:tesfanur@cluster0-q4gsj.mongodb.net/test?retryWrites=true&w=majority`;
function connectToDB() {
  _mongoose2.default.Promise = global.Promise;
  _mongoose2.default.connect(DB_CONNECTION, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(function () {
    return console.log("✔️  Now connected to MongoDB!");
  }).catch(function (err) {
    return console.error("Something went wrong", err);
  });

  _mongoose2.default.connection.on("error", function (err) {
    console.log("DB connection error: " + err.message);
  });
}

exports.default = connectToDB;