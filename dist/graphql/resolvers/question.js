"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.questionResolvers = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _UserModel = require("./../../models/UserModel");

var _UserModel2 = _interopRequireDefault(_UserModel);

var _QuestionModel = require("./../../models/QuestionModel");

var _QuestionModel2 = _interopRequireDefault(_QuestionModel);

var _TopicModel = require("../../models/TopicModel");

var _TopicModel2 = _interopRequireDefault(_TopicModel);

var _SubTopicModel = require("../../models/SubTopicModel");

var _SubTopicModel2 = _interopRequireDefault(_SubTopicModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var isValidObjectId = function isValidObjectId(_id) {
  return _mongoose2.default.Types.ObjectId.isValid(_id);
};
/**
 * Question Mutation Resolvers
    addQuestion(input: QuestionInput): Question
    editQuestion(input: QuestionInput): Question
    deleteQuestion(input: ID): Question
    addTopic(input: TopicInput): Topic
    addSubTopic(input: SubTopicInput): SubTopic
    editTopic(input: TopicInput): Topic
    deleteTopic(input: TopicInput): Topic
    editSubTopic(input: SubTopicInput): SubTopic
    deleteSubTopic(input: SubTopicInput): SubTopic
 */
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
    var questionNumber, description, topic, subtopic, complexityLevel, multipleChoice, imageUrl, answer, explanation, newQuestion;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //destructure user input
            questionNumber = input.questionNumber, description = input.description, topic = input.topic, subtopic = input.subtopic, complexityLevel = input.complexityLevel, multipleChoice = input.multipleChoice, imageUrl = input.imageUrl, answer = input.answer, explanation = input.explanation;
            newQuestion = new _QuestionModel2.default({
              questionNumber: questionNumber,
              description: description,
              topic: topic,
              subtopic: subtopic,
              complexityLevel: complexityLevel,
              multipleChoice: multipleChoice,
              imageUrl: imageUrl,
              answer: answer,
              explanation: explanation
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
    var username, email, password, usertype;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //destructure user input
            username = input.username, email = input.email, password = input.password, usertype = input.usertype;
            return _context2.abrupt("return", null);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
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
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", {});

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function deleteQuestion(_x7, _x8, _x9) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} param1
 */
var addTopic = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref11) {
    var description = _ref11.description;
    var existingTopic, topic;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (description) {
              _context4.next = 2;
              break;
            }

            throw Error("User input error");

          case 2:
            _context4.next = 4;
            return _TopicModel2.default.findOne({
              description: description.trim()
            });

          case 4:
            existingTopic = _context4.sent;

            console.log({ existingTopic: existingTopic });

            if (!existingTopic) {
              _context4.next = 8;
              break;
            }

            throw Error("This sub topic already exists");

          case 8:
            topic = new _TopicModel2.default({ description: description });
            _context4.next = 11;
            return topic.save();

          case 11:
            return _context4.abrupt("return", topic);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function addTopic(_x10, _x11) {
    return _ref10.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} param1
 */
var addSubTopic = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref13) {
    var description = _ref13.description;
    var existingSubtopic, subTopic;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (description) {
              _context5.next = 2;
              break;
            }

            throw Error("User input error");

          case 2:
            _context5.next = 4;
            return _SubTopicModel2.default.findOne({
              description: description.trim()
            });

          case 4:
            existingSubtopic = _context5.sent;

            console.log({ existingSubtopic: existingSubtopic });

            if (!existingSubtopic) {
              _context5.next = 8;
              break;
            }

            throw Error("This sub topic already exists");

          case 8:
            subTopic = new _SubTopicModel2.default({ description: description });
            _context5.next = 11;
            return subTopic.save();

          case 11:
            return _context5.abrupt("return", subTopic);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function addSubTopic(_x12, _x13) {
    return _ref12.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} param1
 */
var editTopic = function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, _ref15) {
    var description = _ref15.description;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log({ description: description });
            return _context6.abrupt("return", {});

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function editTopic(_x14, _x15) {
    return _ref14.apply(this, arguments);
  };
}();
var deleteTopic = function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, _ref17, _ref18) {
    var _id = _ref17._id;
    var req = _ref18.req,
        res = _ref18.res;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", {});

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function deleteTopic(_x16, _x17, _x18) {
    return _ref16.apply(this, arguments);
  };
}();
var editSubTopic = function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, _ref20, _ref21) {
    var _id = _ref20._id;
    var req = _ref21.req,
        res = _ref21.res;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", {});

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function editSubTopic(_x19, _x20, _x21) {
    return _ref19.apply(this, arguments);
  };
}();
var deleteSubTopic = function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_, _ref23, _ref24) {
    var _id = _ref23._id;
    var req = _ref24.req,
        res = _ref24.res;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", {});

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function deleteSubTopic(_x22, _x23, _x24) {
    return _ref22.apply(this, arguments);
  };
}();
/**
 *Question Graphql Queries
getQuestionById(_id: ID!): Question!
getAllQuestions: [Question!]!
getAllQuestionsByTopic(topic: String): [Question!]!
getAllQuestionsBySubTopic: [Question!]!
getAllQuestionsComplexityLevel: [Question!]!
getRondomQuestion: Question!
getRondomQuestions: [Question!]!
getAllTopics: [Topic!]!
getAllSubTopics: [SubTopic!]!
 */
/**
 *
 * @param {*} _
 * @param {*} args
 * @param {*} param2
 * @param {*} info
 *  getQuestionById,
    getAllQuestions,
    getAllQuestionsByTopic,
    getAllQuestionsBySubTopic,
    getAllQuestionsComplexityLevel,
    getRondomQuestion,
    getRondomQuestions,
    getAllTopics,
    getAllSubTopics
 */
var getQuestionById = function () {
  var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_, _ref26, _ref27) {
    var _id = _ref26._id;
    var req = _ref27.req,
        res = _ref27.res;
    var question;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            if (isValidObjectId(_id)) {
              _context10.next = 2;
              break;
            }

            throw Error("Invalide question id");

          case 2:
            _context10.next = 4;
            return _QuestionModel2.default.findById(_id);

          case 4:
            question = _context10.sent;
            return _context10.abrupt("return", question);

          case 6:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function getQuestionById(_x25, _x26, _x27) {
    return _ref25.apply(this, arguments);
  };
}();
var getAllQuestions = function () {
  var _ref28 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(_, args, _ref29) {
    var req = _ref29.req,
        res = _ref29.res;
    var questions;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _QuestionModel2.default.find();

          case 2:
            questions = _context11.sent;

            if (questions) {
              _context11.next = 5;
              break;
            }

            throw Error("No question found");

          case 5:
            return _context11.abrupt("return", questions);

          case 6:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function getAllQuestions(_x28, _x29, _x30) {
    return _ref28.apply(this, arguments);
  };
}();
var getAllQuestionsByTopic = function () {
  var _ref30 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(_, _ref31, _ref32) {
    var topic = _ref31.topic;
    var req = _ref32.req,
        res = _ref32.res;
    var questions;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            if (topic) {
              _context12.next = 2;
              break;
            }

            throw Error("User input error");

          case 2:
            _context12.next = 4;
            return _QuestionModel2.default.find({ topic: topic });

          case 4:
            questions = _context12.sent;

            if (questions) {
              _context12.next = 7;
              break;
            }

            throw Error("No question found");

          case 7:
            return _context12.abrupt("return", questions);

          case 8:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function getAllQuestionsByTopic(_x31, _x32, _x33) {
    return _ref30.apply(this, arguments);
  };
}();
var getAllQuestionsBySubTopic = function () {
  var _ref33 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(_, _ref34, _ref35) {
    var subtopic = _ref34.subtopic;
    var req = _ref35.req,
        res = _ref35.res;
    var questions;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            if (subtopic) {
              _context13.next = 2;
              break;
            }

            throw Error("User input error");

          case 2:
            _context13.next = 4;
            return _QuestionModel2.default.find({ subtopic: subtopic });

          case 4:
            questions = _context13.sent;

            if (questions) {
              _context13.next = 7;
              break;
            }

            throw Error("No question found");

          case 7:
            return _context13.abrupt("return", questions);

          case 8:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function getAllQuestionsBySubTopic(_x34, _x35, _x36) {
    return _ref33.apply(this, arguments);
  };
}();
var getAllQuestionsComplexityLevel = function () {
  var _ref36 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(_, _ref37) {
    var complexityLevel = _ref37.complexityLevel;
    var questions;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            if (complexityLevel) {
              _context14.next = 2;
              break;
            }

            throw Error("User input error");

          case 2:
            _context14.next = 4;
            return _QuestionModel2.default.find({ complexityLevel: complexityLevel });

          case 4:
            questions = _context14.sent;

            if (questions) {
              _context14.next = 7;
              break;
            }

            throw Error("No question found");

          case 7:
            return _context14.abrupt("return", questions);

          case 8:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  }));

  return function getAllQuestionsComplexityLevel(_x37, _x38) {
    return _ref36.apply(this, arguments);
  };
}();
var getRondomQuestion = function () {
  var _ref38 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(_, args) {
    var questions, length;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _QuestionModel2.default.find();

          case 2:
            questions = _context15.sent;

            if (questions) {
              _context15.next = 5;
              break;
            }

            throw Error("No question found");

          case 5:
            length = questions.length;

            if (!(length > 1)) {
              _context15.next = 8;
              break;
            }

            return _context15.abrupt("return", questions[Math.floor(Math.random() * length)]);

          case 8:
            throw Error("No question found");

          case 9:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  }));

  return function getRondomQuestion(_x39, _x40) {
    return _ref38.apply(this, arguments);
  };
}();
var getRondomQuestions = function () {
  var _ref39 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(_, args) {
    var questions, length, numberOfRandomQuestions, tempRandomQuestionArray, i;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _QuestionModel2.default.find();

          case 2:
            questions = _context16.sent;

            if (questions) {
              _context16.next = 5;
              break;
            }

            throw Error("No question found");

          case 5:
            length = questions.length;

            if (!(length <= 1)) {
              _context16.next = 8;
              break;
            }

            return _context16.abrupt("return", questions);

          case 8:
            numberOfRandomQuestions = Math.floor(Math.random() * length);

            console.log({ numberOfRandomQuestions: numberOfRandomQuestions });
            tempRandomQuestionArray = [];

            for (i = 0; i < numberOfRandomQuestions; i++) {
              tempRandomQuestionArray.push(questions[i]);
            }
            return _context16.abrupt("return", tempRandomQuestionArray);

          case 13:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  }));

  return function getRondomQuestions(_x41, _x42) {
    return _ref39.apply(this, arguments);
  };
}();
var getAllTopics = function () {
  var _ref40 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(_, args) {
    var topics;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return _TopicModel2.default.find();

          case 2:
            topics = _context17.sent;
            return _context17.abrupt("return", topics);

          case 4:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  }));

  return function getAllTopics(_x43, _x44) {
    return _ref40.apply(this, arguments);
  };
}();
var getAllSubTopics = function () {
  var _ref41 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(_, args) {
    var subTopics;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return _SubTopicModel2.default.find();

          case 2:
            subTopics = _context18.sent;
            return _context18.abrupt("return", subTopics);

          case 4:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  }));

  return function getAllSubTopics(_x45, _x46) {
    return _ref41.apply(this, arguments);
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
    getRondomQuestions: getRondomQuestions,
    getAllTopics: getAllTopics,
    getAllSubTopics: getAllSubTopics
  },
  Mutation: {
    addQuestion: addQuestion,
    editQuestion: editQuestion,
    deleteQuestion: deleteQuestion,
    addTopic: addTopic,
    addSubTopic: addSubTopic,
    editTopic: editTopic,
    deleteTopic: deleteTopic,
    editSubTopic: editSubTopic,
    deleteSubTopic: deleteSubTopic
  }
};
exports.questionResolvers = questionResolvers;