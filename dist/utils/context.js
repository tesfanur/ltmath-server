"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserModel = require("./../models/UserModel");

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // import { AuthenticationError } from "apollo-server";


var context = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var req = _ref2.req,
        res = _ref2.res;
    var token, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //set isAuthenticated to false and user to nul if not authenticated
            req.isAuthenticated = false;
            req.user = null;
            // get the user token from the headers
            token = req.headers.authorization || "";
            user = void 0;
            _context.prev = 4;
            _context.next = 7;
            return _UserModel2.default.verifyAccessToken(token);

          case 7:
            user = _context.sent;

            console.log({ user: user, contextCallCounter: contextCallCounter++ });

            if (!user) {
              _context.next = 13;
              break;
            }

            req.user = user;
            req.isAuthenticated = true;
            return _context.abrupt("return", { req: req, res: res, user: user });

          case 13:
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](4);

            // throw new AuthenticationError("you must be logged in" + error);
            console.log("you must be logged in " + _context.t0);
            return _context.abrupt("return", { req: req, res: res, user: user });

          case 19:
            if (user) {
              _context.next = 22;
              break;
            }

            console.log("you must be logged in ");
            return _context.abrupt("return", { req: req, res: res, user: user });

          case 22:
            return _context.abrupt("return", { req: req, res: res, user: user });

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 15]]);
  }));

  return function context(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = context;