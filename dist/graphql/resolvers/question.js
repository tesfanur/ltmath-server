"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.questionResolvers = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _QuestionModel = require("./../../models/QuestionModel");

var _QuestionModel2 = _interopRequireDefault(_QuestionModel);

var _TopicModel = require("../../models/TopicModel");

var _TopicModel2 = _interopRequireDefault(_TopicModel);

var _topicTree = require("../../utils/topicTree");

var _topicTree2 = _interopRequireDefault(_topicTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var isValidObjectId = function isValidObjectId(_id) {
  return _mongoose2.default.Types.ObjectId.isValid(_id);
};
/**
 *
 * @param {*} _ parent object enclosing the resolver
 * @param {*} input {email,username, password}
 */

var addQuestion = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref2, _ref3) {
    var input = _ref2.input;
    var req = _ref3.req,
        res = _ref3.res;
    var questionNumber, description, subTopicId, complexityLevel, multipleChoice, imageUrl, answer, explanation, addedBy, newQuestion;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //get current user so that you can add who created the question
            //on the way check if the use is admin
            //destructure user input
            questionNumber = input.questionNumber, description = input.description, subTopicId = input.subTopicId, complexityLevel = input.complexityLevel, multipleChoice = input.multipleChoice, imageUrl = input.imageUrl, answer = input.answer, explanation = input.explanation, addedBy = input.addedBy;
            newQuestion = new _QuestionModel2.default({
              questionNumber: questionNumber,
              description: description,
              subTopicId: subTopicId,
              complexityLevel: complexityLevel,
              multipleChoice: multipleChoice,
              imageUrl: imageUrl,
              answer: answer,
              explanation: explanation,
              addedBy: addedBy
            });
            _context.next = 4;
            return newQuestion.save();

          case 4:
            return _context.abrupt("return", newQuestion);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function addQuestion(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var editQuestion = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref5, _ref6) {
    var input = _ref5.input;
    var req = _ref6.req,
        res = _ref6.res;

    var _id, description, updatedQuestion;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _id = input._id, description = input.description;
            //destructure user input

            updatedQuestion = void 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _QuestionModel2.default.findOneAndUpdate({ _id: _id }, { description: description });

          case 5:
            updatedQuestion = _context2.sent;
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            throw Error("Unable to update sub topic");

          case 11:
            return _context2.abrupt("return", updatedQuestion);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 8]]);
  }));

  return function editQuestion(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _id
 * @param {*} param1
 * @param {*} param2
 */
var deleteQuestion = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref8, _ref9) {
    var _id = _ref8._id;
    var req = _ref9.req,
        res = _ref9.res;
    var question;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log({ _id: _id });

            if (isValidObjectId(_id)) {
              _context3.next = 3;
              break;
            }

            throw Error("Invalid question id");

          case 3:
            question = void 0;
            _context3.prev = 4;
            _context3.next = 7;
            return _QuestionModel2.default.findOneAndDelete({ _id: _id });

          case 7:
            question = _context3.sent;

            console.log({ question: question });
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](4);
            throw Error("Something went wrong!");

          case 14:
            return _context3.abrupt("return", question);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[4, 11]]);
  }));

  return function deleteQuestion(_x7, _x8, _x9) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} param1
 * @param {*} param2
 */

var getQuestionById = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref11, _ref12) {
    var _id = _ref11._id;
    var req = _ref12.req,
        res = _ref12.res;
    var question;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (isValidObjectId(_id)) {
              _context4.next = 2;
              break;
            }

            throw Error("Invalide question id");

          case 2:
            _context4.next = 4;
            return _QuestionModel2.default.findById(_id);

          case 4:
            question = _context4.sent;
            return _context4.abrupt("return", question);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getQuestionById(_x10, _x11, _x12) {
    return _ref10.apply(this, arguments);
  };
}();
var getAllQuestions = function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, args) {
    var questions;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _QuestionModel2.default.find();

          case 2:
            questions = _context5.sent;

            if (questions) {
              _context5.next = 5;
              break;
            }

            throw Error("No question found");

          case 5:
            return _context5.abrupt("return", questions);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function getAllQuestions(_x13, _x14) {
    return _ref13.apply(this, arguments);
  };
}();
var getAllQuestionsByTopic = function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, _ref15, _ref16) {
    var topic = _ref15.topic;
    var req = _ref16.req,
        res = _ref16.res;
    var questions;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (topic) {
              _context6.next = 2;
              break;
            }

            throw Error("User input error");

          case 2:
            _context6.next = 4;
            return _QuestionModel2.default.find({ topic: topic });

          case 4:
            questions = _context6.sent;

            if (questions) {
              _context6.next = 7;
              break;
            }

            throw Error("No question found");

          case 7:
            return _context6.abrupt("return", questions);

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function getAllQuestionsByTopic(_x15, _x16, _x17) {
    return _ref14.apply(this, arguments);
  };
}();
var getAllQuestionsBySubTopic = function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, _ref18, _ref19) {
    var subtopic = _ref18.subtopic;
    var req = _ref19.req,
        res = _ref19.res;
    var questions;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (subtopic) {
              _context7.next = 2;
              break;
            }

            throw Error("User input error");

          case 2:
            _context7.next = 4;
            return _QuestionModel2.default.find({ subtopic: subtopic });

          case 4:
            questions = _context7.sent;

            if (questions) {
              _context7.next = 7;
              break;
            }

            throw Error("No question found");

          case 7:
            return _context7.abrupt("return", questions);

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function getAllQuestionsBySubTopic(_x18, _x19, _x20) {
    return _ref17.apply(this, arguments);
  };
}();
var getAllQuestionsComplexityLevel = function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, _ref21) {
    var complexityLevel = _ref21.complexityLevel;
    var questions;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (complexityLevel) {
              _context8.next = 2;
              break;
            }

            throw Error("User input error");

          case 2:
            _context8.next = 4;
            return _QuestionModel2.default.find({ complexityLevel: complexityLevel });

          case 4:
            questions = _context8.sent;

            if (questions) {
              _context8.next = 7;
              break;
            }

            throw Error("No question found");

          case 7:
            return _context8.abrupt("return", questions);

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function getAllQuestionsComplexityLevel(_x21, _x22) {
    return _ref20.apply(this, arguments);
  };
}();
/**
 * @param {*} _
 * @param {*} args
 */
var getRondomQuestion = function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_, args) {
    var questions, length;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _QuestionModel2.default.find();

          case 2:
            questions = _context9.sent;

            if (questions) {
              _context9.next = 5;
              break;
            }

            throw Error("No question found");

          case 5:
            length = questions.length;

            if (!(length > 1)) {
              _context9.next = 8;
              break;
            }

            return _context9.abrupt("return", questions[Math.floor(Math.random() * length)]);

          case 8:
            throw Error("No question found");

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function getRondomQuestion(_x23, _x24) {
    return _ref22.apply(this, arguments);
  };
}();
/**
 * @param {*} _
 * @param {*} args
 */
var getRondomQuestions = function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_, args) {
    var questions, length, numberOfRandomQuestions, tempRandomQuestionArray, i;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _QuestionModel2.default.find();

          case 2:
            questions = _context10.sent;

            if (questions) {
              _context10.next = 5;
              break;
            }

            throw Error("No question found");

          case 5:
            length = questions.length;

            if (!(length <= 1)) {
              _context10.next = 8;
              break;
            }

            return _context10.abrupt("return", questions);

          case 8:
            numberOfRandomQuestions = Math.floor(Math.random() * length);

            console.log({ numberOfRandomQuestions: numberOfRandomQuestions });
            tempRandomQuestionArray = [];

            for (i = 0; i < numberOfRandomQuestions; i++) {
              tempRandomQuestionArray.push(questions[i]);
            }
            return _context10.abrupt("return", tempRandomQuestionArray);

          case 13:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function getRondomQuestions(_x25, _x26) {
    return _ref23.apply(this, arguments);
  };
}();

var questionResolvers = {
  Query: {
    getQuestionById: getQuestionById,
    getAllQuestions: getAllQuestions,
    getAllQuestionsByTopic: getAllQuestionsByTopic,
    getAllQuestionsBySubTopic: getAllQuestionsBySubTopic,
    getAllQuestionsComplexityLevel: getAllQuestionsComplexityLevel,
    getRondomQuestion: getRondomQuestion,
    getRondomQuestions: getRondomQuestions
  },
  Mutation: {
    addQuestion: addQuestion,
    editQuestion: editQuestion,
    deleteQuestion: deleteQuestion
  }
};
//TODO: add insert many collection at a time for subject, topic, subtopic and others too
//TODO:include text search for each field search by topic search by subtopic...
exports.questionResolvers = questionResolvers;