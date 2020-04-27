"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userResolvers = undefined;

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _jsonwebtoken = require("jsonwebtoken");

var _apolloServer = require("apollo-server");

var _validateUserInput = require("../../utils/validateUserInput");

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

    var username, email, password, confirmPassword, usertype, _validateSignupInput, errors, valid, existingUserByEmail, existingUserByUsername, user, payload, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //destructure user input
            console.log({ signUpinput: input });
            username = input.username, email = input.email, password = input.password, confirmPassword = input.confirmPassword, usertype = input.usertype;

            console.log("userSignupInput", {
              username: username,
              email: email,
              password: password,
              confirmPassword: confirmPassword,
              usertype: usertype
            });
            //validate user input
            _validateSignupInput = (0, _validateUserInput.validateSignupInput)({
              username: username,
              email: email,
              password: password,
              confirmPassword: confirmPassword
            }), errors = _validateSignupInput.errors, valid = _validateSignupInput.valid;

            console.log("from signup valid check result", { errors: errors, valid: valid });

            if (valid) {
              _context.next = 8;
              break;
            }

            console.log({ testErrorForValidUserInput: errors });
            throw new _apolloServer.UserInputError("Invalide user input", { errors: errors });

          case 8:
            _context.next = 10;
            return _UserModel2.default.findOne({ email: email });

          case 10:
            existingUserByEmail = _context.sent;
            _context.next = 13;
            return _UserModel2.default.findOne({ username: username });

          case 13:
            existingUserByUsername = _context.sent;

            if (!existingUserByEmail) {
              _context.next = 18;
              break;
            }

            errors.email = "This email already exists";
            console.log({ errors: errors });
            throw new _apolloServer.UserInputError("Email exists", {
              errors: errors
            });

          case 18:
            if (!existingUserByUsername) {
              _context.next = 22;
              break;
            }

            errors.username = "This username already exists";
            console.log({ errors: errors });
            throw new _apolloServer.UserInputError("Username exists", {
              errors: errors
            });

          case 22:
            _context.prev = 22;
            _context.next = 25;
            return new _UserModel2.default({
              username: username,
              email: email,
              password: password
            }).save();

          case 25:
            user = _context.sent;
            payload = {
              email: user.email,
              username: user.username,
              usertype: user.usertype
            };
            token = generateAuthToken(payload, SECRET_KEY, "7d");

            res.cookie("authorization", token, {
              httpOnly: true,
              secure: true
            });
            res.set("Access-Control-Expose-Headers", "*");
            res.header("authorization", token);
            return _context.abrupt("return", { token: token });

          case 34:
            _context.prev = 34;
            _context.t0 = _context["catch"](22);

            errors.general = "`Something went wrong`";
            throw new _apolloServer.UserInputError("Unknown Problem", errors);

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[22, 34]]);
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

    var username, password, _validateSigninInput, errors, valid, extractedUser, passwordMatch, usertype, email, userpayload, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // console.log({ signIninput: input });
            username = input.username, password = input.password;
            _validateSigninInput = (0, _validateUserInput.validateSigninInput)(username, password), errors = _validateSigninInput.errors, valid = _validateSigninInput.valid;

            if (valid) {
              _context2.next = 4;
              break;
            }

            throw new _apolloServer.UserInputError("Invalid user input!", { errors: errors });

          case 4:
            _context2.next = 6;
            return _UserModel2.default.findOne({
              username: username
            });

          case 6:
            extractedUser = _context2.sent;

            if (extractedUser) {
              _context2.next = 10;
              break;
            }

            errors.userNotFound = "Invalid Credential";
            throw new _apolloServer.UserInputError("Invalid username or password", { errors: errors });

          case 10:
            _context2.next = 12;
            return extractedUser.checkPasswordValidity(password);

          case 12:
            passwordMatch = _context2.sent;

            if (passwordMatch) {
              _context2.next = 16;
              break;
            }

            errors.invalidCredentials = "Invalid username or password";
            throw new _apolloServer.UserInputError("Invalid username or password", { errors: errors });

          case 16:
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
            // res.set("Access-Control-Expose-Headers", "*");
            res.header("authorization", token);

            return _context2.abrupt("return", { token: token });

          case 22:
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

var deleteUserById = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref8, _ref9) {
    var userId = _ref8.userId;
    var req = _ref9.req,
        res = _ref9.res;
    var updatedUserDocument;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (isValidObjectId(userId)) {
              _context3.next = 2;
              break;
            }

            throw Error("Invalid User ID");

          case 2:
            _context3.next = 4;
            return _UserModel2.default.findOneAndRemove({ _id: userId }, { useFindAndModify: false, new: true });

          case 4:
            updatedUserDocument = _context3.sent;

            console.log({ updatedUserDocument: updatedUserDocument });

            if (updatedUserDocument) {
              _context3.next = 8;
              break;
            }

            throw Error("No user found to delete with user id " + userId);

          case 8:
            return _context3.abrupt("return", updatedUserDocument);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function deleteUserById(_x7, _x8, _x9) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} args
 * @param {*} param2
 * @param {*} info
 */

var getAllUsers = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, _ref11, info) {
    var req = _ref11.req,
        res = _ref11.res;
    var token, decoded, users;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            //TODO: handle user role management from ctx object
            token = req.headers.authorization || req.cookies.authorization || "";

            console.log({ token: token });

            if (token) {
              _context4.next = 4;
              break;
            }

            throw new _apolloServer.AuthenticationError("Authorization Failure");

          case 4:
            _context4.next = 6;
            return _UserModel2.default.verifyAccessToken(token);

          case 6:
            decoded = _context4.sent;

            console.log({ decoded: decoded });

            _context4.next = 10;
            return _UserModel2.default.find().exec();

          case 10:
            users = _context4.sent;

            if (!(decoded.usertype === "ADMIN")) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return", users);

          case 15:
            throw new _apolloServer.AuthenticationError("You are not allowed to view lsit of users");

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getAllUsers(_x10, _x11, _x12, _x13) {
    return _ref10.apply(this, arguments);
  };
}();

var getUserByEmail = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref13) {
    var email = _ref13.email;
    var user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _UserModel2.default.findOne({ email: email }).select("-password");

          case 2:
            user = _context5.sent;

            if (user) {
              _context5.next = 5;
              break;
            }

            throw new Error("No user found");

          case 5:
            //TODO: handle if user not found
            console.log({ user: user });
            return _context5.abrupt("return", user);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function getUserByEmail(_x14, _x15) {
    return _ref12.apply(this, arguments);
  };
}();
var getUserByUsername = function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, _ref15) {
    var username = _ref15.username;
    var user;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _UserModel2.default.findOne({ username: username }).select("-password");

          case 2:
            user = _context6.sent;

            if (user) {
              _context6.next = 5;
              break;
            }

            throw new Error("No user found");

          case 5:
            return _context6.abrupt("return", user);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function getUserByUsername(_x16, _x17) {
    return _ref14.apply(this, arguments);
  };
}();
var getUserByID = function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, _ref17) {
    var userId = _ref17.userId;
    var user;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (isValidObjectId(userId)) {
              _context7.next = 2;
              break;
            }

            throw new Error(userId + " is Invalid user id");

          case 2:
            _context7.next = 4;
            return _UserModel2.default.findOne({ _id: userId }).select("-password");

          case 4:
            user = _context7.sent;

            if (user) {
              _context7.next = 7;
              break;
            }

            throw new Error("No user found");

          case 7:
            return _context7.abrupt("return", user);

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function getUserByID(_x18, _x19) {
    return _ref16.apply(this, arguments);
  };
}();

var userResolvers = {
  Mutation: {
    signup: signup,
    signin: signin,
    deleteUserById: deleteUserById
  },
  Query: {
    users: getAllUsers,
    getUserByEmail: getUserByEmail,
    getUserByUsername: getUserByUsername,
    getUserByID: getUserByID
  }
};

exports.userResolvers = userResolvers;