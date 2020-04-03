"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userResolvers = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _jsonwebtoken = require("jsonwebtoken");

var _apolloServer = require("apollo-server");

var _UserModel = require("../../models/UserModel");

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_dotenv2.default.config();
var SECRET_KEY = process.env.SECRET_KEY;
var isValidObjectId = function isValidObjectId(_id) {
  return _mongoose2.default.Types.ObjectId.isValid(_id);
};
/**
 *
 * @param {*} payload
 * @param {*} secret
 * @param {*} expiresIn
 */
var generateAuthToken = function generateAuthToken(payload, secret, expiresIn) {
  return "Bearer " + (0, _jsonwebtoken.sign)(payload, secret, { expiresIn: expiresIn });
};
var setTokens = function setTokens(user) {
  // console.log({ userfromSetTokens: user });
  var sevenDays = 60 * 60 * 24 * 7 * 1000;
  var fifteenMins = 60 * 15 * 1000;
  var accessUser = {
    // id: user._id
    username: user.username,
    email: user.email
  };
  var accessToken = generateAuthToken(accessUser, SECRET_KEY, fifteenMins);

  var refreshUser = {
    username: user.username,
    email: user.email,
    count: user.tokenCount
  };
  var refreshToken = generateAuthToken(refreshUser, SECRET_KEY, sevenDays);

  return { accessToken: accessToken, refreshToken: refreshToken };
};

/**
 *
 * @param {*} _ parent object enclosing the resolver
 * @param {*} input {email,username, password}
 */

var signup = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref2, _ref3) {
    var input = _ref2.input;
    var req = _ref3.req,
        res = _ref3.res;

    var username, email, password, usertype, _UserModel$validate, error, value, validationError, existingUserByEmail, existingUserByUsername, payload, token, userInput, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //destructure user input
            username = input.username, email = input.email, password = input.password, usertype = input.usertype;

            console.log({
              username: username,
              email: email,
              usertype: usertype
            });
            //TODO: validate user input
            _UserModel$validate = _UserModel2.default.validate({
              username: username,
              email: email,
              password: password
            }), error = _UserModel$validate.error, value = _UserModel$validate.value;
            validationError = error;
            // console.log({ error, value });
            // console.log("error-object:=>", error.details[0].message);
            //

            if (!validationError) {
              _context.next = 6;
              break;
            }

            throw new _apolloServer.UserInputError(error.details[0].message);

          case 6:
            _context.next = 8;
            return _UserModel2.default.findOne({ email: email });

          case 8:
            existingUserByEmail = _context.sent;
            _context.next = 11;
            return _UserModel2.default.findOne({ username: username });

          case 11:
            existingUserByUsername = _context.sent;

            if (!(!existingUserByEmail && !existingUserByUsername)) {
              _context.next = 23;
              break;
            }

            //use id for signing with jwt since username or email may be changed by a user
            payload = {
              email: email,
              username: username
            };
            token = generateAuthToken(payload, SECRET_KEY, "7d");
            userInput = _extends({}, input);
            _context.next = 18;
            return new _UserModel2.default(userInput).save();

          case 18:
            user = _context.sent;

            // req.header("authorization", token);
            // req.headers.authorization = token;
            res.cookie("authorization", token, {
              httpOnly: true,
              secure: true
            });
            res.set("Access-Control-Expose-Headers", "*");
            res.header("authorization", token);
            return _context.abrupt("return", { token: token });

          case 23:
            throw new _apolloServer.UserInputError("User with " + username + " username already exists!");

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function signup(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} input  {email,username, password}
 * @param {*} {user}  {email, username, iat, expIn}
 * @return {       
      token
    };
 */

var signin = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref5, _ref6) {
    var input = _ref5.input;
    var req = _ref6.req,
        res = _ref6.res;
    var username, password, extractedUser, usertype, email, userpayload, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            username = input.username, password = input.password;
            // console.log({ headers: req.req.headers });
            //TODO: validate user signin input
            // const validationResult = UserModel.validate(input);
            // console.log(validationResult);

            _context2.next = 3;
            return _UserModel2.default.findOne({
              username: username
            }).select("-password");

          case 3:
            extractedUser = _context2.sent;

            if (extractedUser) {
              _context2.next = 6;
              break;
            }

            throw new _apolloServer.UserInputError("Invalid username or password");

          case 6:
            //compare password using user method
            extractedUser.checkPasswordValidity(password);

            usertype = extractedUser.usertype, email = extractedUser.email;
            userpayload = {
              email: email,
              username: username,
              usertype: usertype
            };
            token = generateAuthToken(userpayload, SECRET_KEY, "7d");

            res.cookie("authorization", token, {
              httpOnly: true,
              secure: true
            });
            res.set("Access-Control-Expose-Headers", "*");
            res.header("authorization", token);

            return _context2.abrupt("return", { token: token });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function signin(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var getAllUsers = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, _ref8, info) {
    var req = _ref8.req,
        res = _ref8.res;
    var token, decoded, users;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            //TODO: handle user role management from ctx object
            token = req.headers.authorization || req.cookies.authorization || "";

            console.log({ token: token });
            _context3.next = 4;
            return _UserModel2.default.verifyAccessToken(token);

          case 4:
            decoded = _context3.sent;

            console.log({ decoded: decoded });
            _context3.next = 8;
            return _UserModel2.default.find().exec();

          case 8:
            users = _context3.sent;

            if (!(decoded.usertype === "ADMIN")) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt("return", users);

          case 13:
            throw new _apolloServer.AuthenticationError("You are not allowed to view lsit of users");

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getAllUsers(_x7, _x8, _x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();

var getUserByEmail = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref10) {
    var email = _ref10.email;
    var user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _UserModel2.default.findOne({ email: email }).select("-password");

          case 2:
            user = _context4.sent;

            if (user) {
              _context4.next = 5;
              break;
            }

            throw new Error("No user found");

          case 5:
            //TODO: handle if user not found
            console.log({ user: user });
            return _context4.abrupt("return", user);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getUserByEmail(_x11, _x12) {
    return _ref9.apply(this, arguments);
  };
}();
var getUserByUsername = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref12) {
    var username = _ref12.username;
    var user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _UserModel2.default.findOne({ username: username }).select("-password");

          case 2:
            user = _context5.sent;

            if (user) {
              _context5.next = 5;
              break;
            }

            throw new Error("No user found");

          case 5:
            return _context5.abrupt("return", user);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function getUserByUsername(_x13, _x14) {
    return _ref11.apply(this, arguments);
  };
}();
var getUserByID = function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, _ref14) {
    var _id = _ref14._id;
    var user;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (isValidObjectId(_id)) {
              _context6.next = 2;
              break;
            }

            throw new Error(_id + " is Invalid user id");

          case 2:
            _context6.next = 4;
            return _UserModel2.default.findOne({ _id: _id }).select("-password");

          case 4:
            user = _context6.sent;

            if (user) {
              _context6.next = 7;
              break;
            }

            throw new Error("No user found");

          case 7:
            return _context6.abrupt("return", user);

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function getUserByID(_x15, _x16) {
    return _ref13.apply(this, arguments);
  };
}();

var userResolvers = {
  Mutation: {
    signup: signup,
    signin: signin
  },
  Query: {
    users: getAllUsers,
    getUserByEmail: getUserByEmail,
    getUserByUsername: getUserByUsername,
    getUserByID: getUserByID
  }
};

exports.userResolvers = userResolvers;