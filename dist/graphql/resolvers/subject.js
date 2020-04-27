"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subjectResolvers = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _SubjectModel = require("../../models/SubjectModel");

var _SubjectModel2 = _interopRequireDefault(_SubjectModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var isValidObjectId = function isValidObjectId(_id) {
  return _mongoose2.default.Types.ObjectId.isValid(_id);
};
/**
 *
 * @param {*} _
 * @param {*} param1
 */
var addSubject = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref2) {
    var subjectName = _ref2.subjectName;
    var existingSubject, subject;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (subjectName) {
              _context.next = 2;
              break;
            }

            throw Error("User input error");

          case 2:
            _context.next = 4;
            return _SubjectModel2.default.findOne({
              subjectName: subjectName.trim()
            });

          case 4:
            existingSubject = _context.sent;

            console.log({ existingSubject: existingSubject });

            if (!existingSubject) {
              _context.next = 8;
              break;
            }

            throw Error("This sub Subject already exists");

          case 8:
            subject = new _SubjectModel2.default({ subjectName: subjectName });
            _context.next = 11;
            return subject.save();

          case 11:
            return _context.abrupt("return", subject);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function addSubject(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var deleteSubject = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref4, _ref5) {
    var subjectId = _ref4.subjectId;
    var req = _ref5.req,
        res = _ref5.res;
    var updatedSubjectDocument;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (isValidObjectId(subjectId)) {
              _context2.next = 2;
              break;
            }

            throw Error("Invalid Topic ID");

          case 2:
            _context2.next = 4;
            return _SubjectModel2.default.findOneAndRemove({ _id: subjectId }, { useFindAndModify: false, new: true });

          case 4:
            updatedSubjectDocument = _context2.sent;

            console.log({ updatedSubjectDocument: updatedSubjectDocument });

            if (updatedSubjectDocument) {
              _context2.next = 8;
              break;
            }

            throw Error("No subject found to delete with subject id " + subjectId);

          case 8:
            return _context2.abrupt("return", updatedSubjectDocument);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function deleteSubject(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} param1
 */
var findSubjectByIdAndUpdate = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref7) {
    var subjectId = _ref7.subjectId,
        subjectUpdateOption = _ref7.subjectUpdateOption;
    var updatedTopicDocument;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (isValidObjectId(subjectId)) {
              _context3.next = 2;
              break;
            }

            throw Error("Invalid Topic ID");

          case 2:
            console.log({ subjectId: subjectId, subjectUpdateOption: subjectUpdateOption });
            _context3.prev = 3;
            _context3.next = 6;
            return _SubjectModel2.default.findOneAndUpdate({ _id: subjectId }, {
              subjectName: subjectUpdateOption.subjectName
            }, { useFindAndModify: false, new: true });

          case 6:
            updatedTopicDocument = _context3.sent;

            console.log({ updatedTopicDocument: updatedTopicDocument });

            if (updatedTopicDocument) {
              _context3.next = 10;
              break;
            }

            throw Error("Failed to update");

          case 10:
            return _context3.abrupt("return", updatedTopicDocument);

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](3);
            throw Error(_context3.t0);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[3, 13]]);
  }));

  return function findSubjectByIdAndUpdate(_x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} param1
 */
var getSubjectById = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref9) {
    var subjectId = _ref9.subjectId;
    var subject;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log({ subjectId: subjectId });

            if (isValidObjectId(subjectId)) {
              _context4.next = 3;
              break;
            }

            throw Error("Invalide Subject id");

          case 3:
            _context4.next = 5;
            return _SubjectModel2.default.findById(subjectId);

          case 5:
            subject = _context4.sent;

            if (subject) {
              _context4.next = 8;
              break;
            }

            throw Error("No subject found");

          case 8:
            return _context4.abrupt("return", subject);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getSubjectById(_x8, _x9) {
    return _ref8.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} args
 */
var getAllSubjects = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, args) {
    var subjects;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _SubjectModel2.default.find();

          case 2:
            subjects = _context5.sent;
            return _context5.abrupt("return", subjects);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function getAllSubjects(_x10, _x11) {
    return _ref10.apply(this, arguments);
  };
}();

var subjectResolvers = {
  Query: {
    getAllSubjects: getAllSubjects,
    getSubjectById: getSubjectById
  },
  Mutation: {
    addSubject: addSubject,
    deleteSubject: deleteSubject,
    findSubjectByIdAndUpdate: findSubjectByIdAndUpdate
  }
};
//TODO: add insert many collection at a time for subject, topic, subtopic and others too
//TODO:include text search for each field search by topic search by subtopic...
exports.subjectResolvers = subjectResolvers;