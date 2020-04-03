"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserModel = require("./../models/UserModel");

var _UserModel2 = _interopRequireDefault(_UserModel);

var _apolloServer = require("apollo-server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var authenticate = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var req = _ref2.req;
    var token, decoded, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            // const token = req.headers.authorization;
            token = req.get("authorization");

            console.log({ token: token });

            if (toekn) {
              _context.next = 5;
              break;
            }

            throw new _apolloServer.AuthenticationError("Authentication Error");

          case 5:
            _context.next = 7;
            return _UserModel2.default.verifyAccessToken(token);

          case 7:
            decoded = _context.sent;

            console.log({ tokenFromAuthenticate: token, decoded: decoded });

            _context.next = 11;
            return _UserModel2.default.findOne({ username: decoded.username }).lean().select("-password").exec();

          case 11:
            user = _context.sent;
            return _context.abrupt("return", user);

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", null);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 15]]);
  }));

  return function authenticate(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = authenticate;