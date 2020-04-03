"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mongoose = require("mongoose");

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _apolloServer = require("apollo-server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_dotenv2.default.config();
var SECRET_KEY = process.env.SECRET_KEY;


var UserSchema = new _mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  usertype: {
    type: String,
    enum: ["STUDENT", "PARENT", "TEACHER", "AUTHOR", "ADMIN"],
    default: "STUDENT"
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 400
  }
}, { timestamps: true });
/**
 * Validates user input with its proper schema definition
 */
UserSchema.statics.validate = function validateSchema(User) {
  var schema = _joi2.default.object().keys({
    username: _joi2.default.string().alphanum().min(5).max(50).required(),
    password: _joi2.default.string().regex(/^[a-zA-Z0-9]{5,200}$/),
    email: _joi2.default.string().min(5).max(50).email({ minDomainAtoms: 2 })
  }).with("username", "email");

  return _joi2.default.validate(User, schema);
};
/**
 * hash password whenever user updates his password
 */
UserSchema.pre("save", function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(next) {
    var SALT_ROUND, hashedPassword;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (this.isModified("password")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", next());

          case 3:
            _context.next = 5;
            return (0, _bcryptjs.genSalt)(12);

          case 5:
            SALT_ROUND = _context.sent;
            _context.next = 8;
            return (0, _bcryptjs.hash)(this.password, SALT_ROUND);

          case 8:
            hashedPassword = _context.sent;

            // override the plain text password with the hashed one
            this.password = hashedPassword;
            next();
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);

            next(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 13]]);
  }));

  function hashPassword(_x) {
    return _ref.apply(this, arguments);
  }

  return hashPassword;
}());
/**
 * compare user password matching
 */
UserSchema.methods.checkPasswordValidity = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(password) {
    var passwordMatches;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _bcryptjs.compare)(password, this.password);

          case 2:
            passwordMatches = _context2.sent;
            _context2.prev = 3;

            if (passwordMatches) {
              _context2.next = 6;
              break;
            }

            throw new _apolloServer.AuthenticationError("Invalid Password or Username");

          case 6:
            return _context2.abrupt("return", passwordMatches);

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](3);
            throw new _apolloServer.AuthenticationError("Something went wrong. Try again later please. error: " + _context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[3, 9]]);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 *generate user access token
 */
UserSchema.methods.generateAccessToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var user, token;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          user = this;
          _context3.next = 4;
          return (0, _jsonwebtoken.sign)({ _id: user._id.toHexString(), username: user.username }, SECRET_KEY);

        case 4:
          token = _context3.sent;

          if (!token) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", token);

        case 7:
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          throw new _apolloServer.AuthenticationError("Authentication failed!");

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this, [[0, 9]]);
}));
/**
 * decode user access token
 */
UserSchema.statics.verifyAccessToken = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(token) {
    var decodedUserInfo, email, username, currentUser, usertype;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (token) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", new _apolloServer.AuthenticationError("Token Authorization failed!"));

          case 2:
            token = token.replace("Bearer ", "");
            _context4.next = 5;
            return (0, _jsonwebtoken.verify)(token, SECRET_KEY);

          case 5:
            decodedUserInfo = _context4.sent;
            _context4.prev = 6;

            if (!decodedUserInfo) {
              _context4.next = 16;
              break;
            }

            email = decodedUserInfo.email, username = decodedUserInfo.username;
            _context4.next = 11;
            return this.findOne({ username: username }).exec();

          case 11:
            currentUser = _context4.sent;

            if (currentUser) {
              _context4.next = 14;
              break;
            }

            throw new _apolloServer.AuthenticationError("Token Authorization failed!");

          case 14:
            usertype = currentUser.usertype;
            // console.log("decodedUserInfo", { ...decodedUserInfo, usertype });

            return _context4.abrupt("return", _extends({}, decodedUserInfo, { usertype: usertype }));

          case 16:
            _context4.next = 21;
            break;

          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](6);
            throw new _apolloServer.AuthenticationError("Authentication failed!");

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[6, 18]]);
  }));

  return function (_x3) {
    return _ref4.apply(this, arguments);
  };
}();
var UserModel = (0, _mongoose.model)("User", UserSchema);
//==============================
exports.default = UserModel;