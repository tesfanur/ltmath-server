"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.context = exports.authenticate = undefined;

var _bcryptjs = require("bcryptjs");

var _UserModel = require("../models/UserModel");

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var authenticate = exports.authenticate = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref2, context, info) {
    var input = _ref2.input;
    var username, password, currentUser, match, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            username = input.username, password = input.password;
            _context.next = 3;
            return _UserModel2.default.findOne(username).exec();

          case 3:
            currentUser = _context.sent;

            if (currentUser) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", console.log("User not found!"));

          case 6:
            _context.next = 8;
            return (0, _bcryptjs.compare)(password, currentUser.password);

          case 8:
            match = _context.sent;

            if (match) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", console.log("Authentication error!"));

          case 11:
            token = (0, _bcryptjs.sign)({ email: currentUser.email, id: currentUser.id }, SECRET_KEY);
            return _context.abrupt("return", {
              success: true,
              token: token
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function authenticate(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} param
 */
var context = exports.context = function context(_ref3) {
  var req = _ref3.req;

  var token = req.headers.authorization || "";

  try {
    var _jwt$verify;

    return _jwt$verify = jwt.verify(token.split(" ")[1], SECRET_KEY), id = _jwt$verify.id, email = _jwt$verify.email, _jwt$verify;
  } catch (e) {
    throw new AuthenticationError("Authentication token is invalid, please log in");
  }
};