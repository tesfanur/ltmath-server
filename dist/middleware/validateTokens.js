"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTokens = exports.validateTokensMiddleware = exports.validateRefreshToken = exports.validateAccessToken = undefined;

// // module `validate-tokens-middleware`
// const {
//     validateAccessToken,
//     validateRefreshToken
//   } = require("./validate-tokens");
//   const userRepo = require("../users/users-repository");
//   const { setTokens } = require("./set-tokens");

var validateTokensMiddleware = exports.validateTokensMiddleware = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var refreshToken, accessToken, decodedAccessToken, decodedRefreshToken, user, userTokens;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            refreshToken = req.headers["x-refresh-token"];
            accessToken = req.headers["x-access-token"];

            console.log("from validateTokensMiddleware =>", {
              refreshToken: refreshToken,
              accessToken: accessToken,
              headers: req.headers
            });
            // console.log({ responseObject: res });

            if (!(!accessToken && !refreshToken)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", next());

          case 5:
            decodedAccessToken = validateAccessToken(accessToken);

            if (!(decodedAccessToken && decodedAccessToken.user)) {
              _context.next = 9;
              break;
            }

            req.user = decodedAccessToken.user;
            return _context.abrupt("return", next());

          case 9:
            decodedRefreshToken = validateRefreshToken(refreshToken);

            if (!(decodedRefreshToken && decodedRefreshToken.user)) {
              _context.next = 20;
              break;
            }

            _context.next = 13;
            return _UserModel2.default.findOne({
              username: decodedRefreshToken.user.username
            });

          case 13:
            user = _context.sent;

            if (!(!user || user.tokenCount !== decodedRefreshToken.user.count)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", next());

          case 16:
            req.user = decodedRefreshToken.user;
            // refresh the tokens
            userTokens = setTokens(user);


            res.set({
              "Access-Control-Expose-Headers": "x-access-token,x-refresh-token",
              "x-access-token": userTokens.accessToken,
              "x-refresh-token": userTokens.refreshToken
            });
            return _context.abrupt("return", next());

          case 20:
            next();

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function validateTokensMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _jsonwebtoken = require("jsonwebtoken");

var _UserModel = require("../models/UserModel");

var _UserModel2 = _interopRequireDefault(_UserModel);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_dotenv2.default.config();
var SECRET_KEY = process.env.SECRET_KEY;
var validateAccessToken = exports.validateAccessToken = function validateAccessToken(token) {
  try {
    return (0, _jsonwebtoken.verify)(token, SECRET_KEY);
  } catch (error) {
    return console.error(error);
  }
};

var validateRefreshToken = exports.validateRefreshToken = function validateRefreshToken(token) {
  try {
    return (0, _jsonwebtoken.verify)(token, SECRET_KEY);
  } catch (error) {
    return error;
  }
};var setTokens = exports.setTokens = function setTokens(user) {
  console.log({ userfromSetTokens: user });
  var sevenDays = 60 * 60 * 24 * 7 * 1000;
  var fifteenMins = 60 * 15 * 1000;
  var accessUser = {
    // id: user._id
    username: user.username,
    email: user.email
  };
  var accessToken = sign({ user: accessUser }, SECRET_KEY, {
    expiresIn: fifteenMins
  });
  var refreshUser = {
    // id: user.id,
    username: user.username,
    email: user.email,
    count: user.tokenCount
  };
  var refreshToken = sign({ user: refreshUser }, SECRET_KEY, {
    expiresIn: sevenDays
  });

  return { accessToken: accessToken, refreshToken: refreshToken };
};