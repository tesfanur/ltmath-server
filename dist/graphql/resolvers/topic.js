"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topicResolvers = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _TopicModel = require("../../models/TopicModel");

var _TopicModel2 = _interopRequireDefault(_TopicModel);

var _SubjectModel = require("../../models/SubjectModel");

var _SubjectModel2 = _interopRequireDefault(_SubjectModel);

var _topicTree = require("../../utils/topicTree");

var _topicTree2 = _interopRequireDefault(_topicTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var isValidObjectId = function isValidObjectId(_id) {
  return _mongoose2.default.Types.ObjectId.isValid(_id);
};
/**
 *
 * @param {*} _
 * @param {*} param1
 */
//TODO:refactor the addTopic function in a better way than the following implementation
var addTopic = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref2) {
    var topicNameArr = _ref2.topicNameArr,
        subjectId = _ref2.subjectId;
    var isValidSubjectId, ExistsInSubjColl, subjectExistsInTopicColl, topics, topicExist, topic, subjId;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isValidSubjectId = isValidObjectId(subjectId);
            _context.next = 3;
            return _SubjectModel2.default.findById(subjectId);

          case 3:
            ExistsInSubjColl = _context.sent;
            _context.next = 6;
            return _TopicModel2.default.findOne({ subjectId: subjectId });

          case 6:
            subjectExistsInTopicColl = _context.sent;


            // topicNameArr.forEach((topic) => {
            //   let testTopic = new TopicSubDocument(topic);
            //   testTopic.save();
            // });
            topics = topicNameArr;
            _context.next = 10;
            return _TopicModel2.default.findOne({
              "topics.topic": topics[0].topic
            });

          case 10:
            topicExist = _context.sent;

            if (!topicExist) {
              _context.next = 14;
              break;
            }

            console.log("Topic Already exisits");
            throw Error("Topic Already exisits");

          case 14:
            console.log({
              topicExist: JSON.stringify(topicExist),
              topic: topics[0].topic,
              topics: topics
            });
            topic = void 0;

            if (!ExistsInSubjColl) {
              _context.next = 40;
              break;
            }

            subjId = ExistsInSubjColl._id.toString();

            if (!(!subjectExistsInTopicColl && isValidSubjectId)) {
              _context.next = 32;
              break;
            }

            console.log({ subjectId: subjectId, topics: topics });

            _context.prev = 20;

            //add default topics
            topic = new _TopicModel2.default({
              subjectId: subjId,
              topics: topics
            });

            _context.next = 24;
            return topic.save();

          case 24:
            // console.log({ topic: JSON.stringify(topic) });
            console.log({ test1: "test1" });
            return _context.abrupt("return", topic);

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](20);

            console.log({ test2: "test2" });
            console.log({ exc: _context.t0 });

          case 32:
            // console.log({ test3: `test3` });
            console.log({ subjectExistsInTopicColl: subjectExistsInTopicColl.topics });
            console.log({ topicsTobeAdded: topics });
            subjectExistsInTopicColl.topics.push({ $each: topics, $position: 0 });
            _context.next = 37;
            return subjectExistsInTopicColl.save();

          case 37:
            return _context.abrupt("return", _context.sent);

          case 40:
            if (!(!subjectExistsInTopicColl && isValidSubjectId)) {
              _context.next = 53;
              break;
            }

            _context.prev = 41;

            console.log({ test4: "test4" });
            topic = new _TopicModel2.default({ subjectId: subjectId, topics: topics });
            _context.next = 46;
            return topic.save();

          case 46:
            return _context.abrupt("return", topic);

          case 49:
            _context.prev = 49;
            _context.t1 = _context["catch"](41);

            console.log({ test5: "test5" });
            console.log({ error: _context.t1 });

          case 53:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[20, 28], [41, 49]]);
  }));

  return function addTopic(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} param1
 */
var addSubTopic = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref4) {
    var subTopicNameArr = _ref4.subTopicNameArr,
        topicId = _ref4.topicId;
    var isValidTopicId, topicDocument, subTopicsTobeAdded, uniqueSubTopics, topicName, addedSubTopics;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            isValidTopicId = isValidObjectId(topicId);

            if (isValidTopicId) {
              _context2.next = 3;
              break;
            }

            throw Error("Invalid Topic Id");

          case 3:
            _context2.next = 5;
            return _TopicModel2.default.findOne({
              "topics._id": topicId
            });

          case 5:
            topicDocument = _context2.sent;
            subTopicsTobeAdded = [].concat(_toConsumableArray(subTopicNameArr));
            uniqueSubTopics = [];

            if (topicDocument) {
              _context2.next = 10;
              break;
            }

            throw Error("No Topic Found. Please add the top first!");

          case 10:
            // console.log({
            //   topicDocumentTopics: JSON.stringify(topicDocument.topics),
            // });
            // const subTopics = subTopicNameArr;
            // let iteratationCount = 0;
            console.log({
              treeLength: _topicTree2.default.length,
              length: topicDocument.topics.length
            });

            topicName = void 0, addedSubTopics = [];

            topicDocument.topics.forEach(function (existingTopic) {
              //show all ids of the topic
              // topicTree.forEach((topicFromTopicTree) => {
              //   if (existingTopic.topic == topicFromTopicTree.topic.trim()) {
              //     //default sub topics to add
              //     if (existingTopic && existingTopic.subTopics.length === 0)
              //       existingTopic.subTopics.push(...topicFromTopicTree.subTopics);
              //   }
              // });

              if (existingTopic._id.toString() === topicId) {
                // if (topic.subTopics.length === 0)
                //modify this code to add the incoming subtopics in their proper
                //topic
                // topic.subTopics.push(...subTopicNameArr);
                //check if subtopic already exists
                topicName = existingTopic.topic;
                var existingSubTopics = [].concat(_toConsumableArray(new Set(existingTopic.subTopics.map(function (subtopic) {
                  return subtopic.subTopic;
                }))));
                console.log({ existingSubTopics: existingSubTopics });
                // subTopicsTobeAdded = topic;
                console.log({ existingTopic: existingTopic });
                subTopicsTobeAdded.forEach(function (sTopic) {
                  console.log("existingSubTopics.includes(sTopic.subTopic) " + existingSubTopics.includes(sTopic.subTopic));
                  if (existingSubTopics.includes(sTopic.subTopic)) throw Error("\"" + sTopic.subTopic + "\" sub topic already exists!");
                  console.log({ subtopicToBeAdded: sTopic });
                  existingTopic.subTopics.push(sTopic);
                  // await topicDocument.save();
                  // addedSubTopics.push(existingTopic.subTopics.slice(-1));
                  addedSubTopics = [existingTopic];
                });

                uniqueSubTopics = [].concat(_toConsumableArray(new Set(existingTopic.subTopics.map(function (subtopic) {
                  return subtopic.subTopic;
                }))));
              }
            });

            _context2.next = 15;
            return topicDocument.save();

          case 15:
            if (!(addedSubTopics.length == 0)) {
              _context2.next = 17;
              break;
            }

            throw Error("Failed to add subtopics");

          case 17:
            return _context2.abrupt("return", addedSubTopics);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function addSubTopic(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} param1
 */
var findTopicByIdAndUpdate = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref6) {
    var topicId = _ref6.topicId,
        topicUpdateOption = _ref6.topicUpdateOption;
    var updatedTopicDocument, updatedTopic;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (isValidObjectId(topicId)) {
              _context3.next = 2;
              break;
            }

            throw Error("Invalid Topic ID");

          case 2:
            _context3.next = 4;
            return _TopicModel2.default.findOneAndUpdate({ "topics._id": topicId }, {
              "topics.$.topic": topicUpdateOption.topic
            }, { useFindAndModify: false, new: true });

          case 4:
            updatedTopicDocument = _context3.sent;

            if (updatedTopicDocument) {
              _context3.next = 7;
              break;
            }

            throw Error("Failed to update");

          case 7:
            updatedTopic = void 0;

            if (updatedTopicDocument && updatedTopicDocument.topics.length > 0) {
              updatedTopicDocument.topics.forEach(function (topic) {
                if (topic._id.toString() === topicId) updatedTopic = topic;
              });
            }

            if (updatedTopic) {
              _context3.next = 11;
              break;
            }

            throw Error("Topic update failed");

          case 11:
            return _context3.abrupt("return", updatedTopic);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function findTopicByIdAndUpdate(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} param1
 * @param {*} param2
 */
var deleteTopic = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref8, _ref9) {
    var topicId = _ref8.topicId;
    var req = _ref9.req,
        res = _ref9.res;
    var updatedTopicDocument;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (isValidObjectId(topicId)) {
              _context4.next = 2;
              break;
            }

            throw Error("Invalid Topic ID");

          case 2:
            _context4.next = 4;
            return _TopicModel2.default.findOneAndUpdate({ "topics._id": topicId }, {
              $pull: {
                topics: { _id: topicId }
              }
            }, { useFindAndModify: false, new: true });

          case 4:
            updatedTopicDocument = _context4.sent;

            if (updatedTopicDocument) {
              _context4.next = 7;
              break;
            }

            throw Error("No topic found to delete with topic id " + topicId);

          case 7:
            return _context4.abrupt("return", [updatedTopicDocument]);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function deleteTopic(_x7, _x8, _x9) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} param1
 * @param {*} param2
 */
var findSubTopicByIdandUpdate = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref11) {
    var topicId = _ref11.topicId,
        subTopicId = _ref11.subTopicId,
        subTopicUpdateOption = _ref11.subTopicUpdateOption;
    var updatedTopicDocument, updatedTopic;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (isValidObjectId(subTopicId)) {
              _context5.next = 2;
              break;
            }

            throw Error("Invalid Topic ID");

          case 2:
            _context5.next = 4;
            return _TopicModel2.default.findOneAndUpdate({
              "topics._id": topicId,
              "topics.subTopics._id": subTopicId
            }, {
              $set: {
                // "topics.$.subTopics.0.subTopic": subTopicUpdateOption.subTopic,
                "topics.$[topic].subTopics.$[subTopic].subTopic": subTopicUpdateOption.subTopic
              }
            }, {
              useFindAndModify: false,
              new: true,
              arrayFilters: [{ "topic._id": topicId }, { "subTopic._id": subTopicId }]
            });

          case 4:
            updatedTopicDocument = _context5.sent;

            console.log({ updatedTopicDocument: JSON.stringify(updatedTopicDocument) });

            if (updatedTopicDocument) {
              _context5.next = 8;
              break;
            }

            throw Error("Failed to update");

          case 8:
            updatedTopic = void 0;

            if (updatedTopicDocument && updatedTopicDocument.topics.length > 0) {
              updatedTopicDocument.topics.forEach(function (topic) {
                if (topic._id.toString() === topicId) updatedTopic = [topic];
              });
            }

            if (updatedTopic) {
              _context5.next = 12;
              break;
            }

            throw Error("Topic update failed");

          case 12:
            return _context5.abrupt("return", updatedTopic);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function findSubTopicByIdandUpdate(_x10, _x11) {
    return _ref10.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} param1
 * @param {*} param2
 */
var deleteSubTopic = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, _ref13) {
    var topicId = _ref13.topicId,
        subTopicId = _ref13.subTopicId;
    var updatedTopicDocument, topicDocument, topics, subTopics;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (isValidObjectId(subTopicId)) {
              _context6.next = 2;
              break;
            }

            throw Error("Invalid Topic ID");

          case 2:
            _context6.next = 4;
            return _TopicModel2.default.updateOne({
              "topics._id": topicId
            }, {
              $pull: {
                "topics.$.subTopics": {
                  _id: subTopicId
                }
              }
            }, {
              useFindAndModify: false,
              new: true
            });

          case 4:
            updatedTopicDocument = _context6.sent;

            console.log({
              updatedTopicDocument: updatedTopicDocument
            });
            //returns of such type object: { updatedTopicDocument: '{"n":1,"nModified":0,"ok":1}' }
            //or { updatedTopicDocument: '{"n":1,"nModified":1,"ok":1}' }
            if (updatedTopicDocument.nModified > 0) console.log("You have successfully removed subtopic with id " + subTopicId);else console.log("Subtopic with id " + subTopicId + " doesn't exist");
            console.log({
              updatedTopicDocument: JSON.stringify(updatedTopicDocument)
            });

            if (updatedTopicDocument) {
              _context6.next = 10;
              break;
            }

            throw Error("Failed to update");

          case 10:
            _context6.next = 12;
            return _TopicModel2.default.findOne();

          case 12:
            topicDocument = _context6.sent;

            console.log({
              topicDocumentFromDeleteSubTopicResolver: topicDocument
            });

            if (topicDocument) {
              _context6.next = 16;
              break;
            }

            throw Error("No such sub topic found");

          case 16:
            topics = topicDocument.topics;
            subTopics = void 0;

            console.log({
              topics: topics
            });
            topics.forEach(function (topic) {
              if (topic._id.toString() === topicId) {
                subTopics = [topic];
              }
            });

            return _context6.abrupt("return", subTopics);

          case 21:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function deleteSubTopic(_x12, _x13) {
    return _ref12.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} args
 */
var getAllTopics = function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, args) {
    var topics;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _TopicModel2.default.find().populate("subjectId");

          case 2:
            topics = _context7.sent;

            if (!(topics.length == 0)) {
              _context7.next = 5;
              break;
            }

            throw Error("No topic found. Please add topics");

          case 5:
            return _context7.abrupt("return", topics);

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function getAllTopics(_x14, _x15) {
    return _ref14.apply(this, arguments);
  };
}();
/**
 * @param {*} _
 * @param {*} args
 */
var getTopicById = function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, _ref16) {
    var topicId = _ref16.topicId;
    var topics, topicFound;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            console.log({ topicId: topicId });
            //https://codelikethis.com/lessons/db/mongodb-array-queries

            if (isValidObjectId(topicId)) {
              _context8.next = 3;
              break;
            }

            throw Error("Invalid Object ID");

          case 3:
            _context8.next = 5;
            return _TopicModel2.default.find({ "topics._id": topicId });

          case 5:
            topics = _context8.sent;
            topicFound = void 0;

            if (topics && topics.length > 0) {
              console.log(topics[0]["topics"]);
              topics[0]["topics"].forEach(function (topic) {
                if (topic._id.toString() == topicId) topicFound = topic;
              });
            }

            if (topicFound) {
              _context8.next = 10;
              break;
            }

            throw Error("No topic found");

          case 10:
            return _context8.abrupt("return", topicFound);

          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function getTopicById(_x16, _x17) {
    return _ref15.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} param1
 */
var getSubTopicById = function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_, _ref18) {
    var topicId = _ref18.topicId,
        subTopicId = _ref18.subTopicId;
    var topics, topicFound;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            console.log({ subTopicId: subTopicId });

            if (isValidObjectId(subTopicId)) {
              _context9.next = 3;
              break;
            }

            throw Error("Invalid Object ID");

          case 3:
            _context9.next = 5;
            return _TopicModel2.default.findOne({
              "topics._id": topicId
              // "topics.subTopis._id": subTopicId,
            });

          case 5:
            topics = _context9.sent;

            console.log({
              topics: JSON.stringify(topics),
              length: topics.topics.length,
              topicstopics: topics.topics
            });
            topicFound = void 0;

            if (topics) {
              // console.log(topics[0]["topics"]);
              topics.topics.forEach(function (topic) {
                console.log({ topic: JSON.stringify(topic) });
                console.log({
                  topicsubTopicsidsubTopic: topic.subTopics.id(subTopicId)
                });
                // if (topic._id.toString() == topicId) topicFound = [topic];
                // if (topic.subTopics.id(subTopicId)) topicFound = [topic];
                if (topic.subTopics.id(subTopicId)) topicFound = topic.subTopics.id(subTopicId);
              });
            }

            if (topicFound) {
              _context9.next = 11;
              break;
            }

            throw Error("No topic found");

          case 11:
            return _context9.abrupt("return", topicFound);

          case 12:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function getSubTopicById(_x18, _x19) {
    return _ref17.apply(this, arguments);
  };
}();
/**
 *
 * @param {*} _
 * @param {*} args
 */
var getAllSubTopics = function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_, _ref20) {
    var topicId = _ref20.topicId;
    var topicDocument, topics, subTopics;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            if (isValidObjectId(topicId)) {
              _context10.next = 2;
              break;
            }

            throw Error("Invalid id: " + topicId);

          case 2:
            _context10.next = 4;
            return _TopicModel2.default.findOne({ "topics._id": topicId });

          case 4:
            topicDocument = _context10.sent;

            if (topicDocument) {
              _context10.next = 7;
              break;
            }

            throw Error("No topic found with id: " + topicId);

          case 7:
            console.log({ topicDocument: topicDocument });
            topics = topicDocument.topics;
            subTopics = void 0;

            topics.forEach(function (topic) {
              if (topic._id.toString() === topicId) {
                subTopics = [topic];
              }
            });
            return _context10.abrupt("return", subTopics);

          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function getAllSubTopics(_x20, _x21) {
    return _ref19.apply(this, arguments);
  };
}();

var topicResolvers = {
  Query: {
    getAllTopics: getAllTopics,
    getTopicById: getTopicById,
    //subtopic sub domain
    getAllSubTopics: getAllSubTopics,
    getSubTopicById: getSubTopicById
  },
  Mutation: {
    //topic sub domain
    addTopic: addTopic,
    findTopicByIdAndUpdate: findTopicByIdAndUpdate,
    deleteTopic: deleteTopic,
    //subtopic sub domain
    addSubTopic: addSubTopic,
    findSubTopicByIdandUpdate: findSubTopicByIdandUpdate,
    deleteSubTopic: deleteSubTopic
  }
};
//TODO: add insert many collection at a time for subject, topic, subtopic and others too
//TODO:include text search for each field search by topic search by subtopic...
exports.topicResolvers = topicResolvers;