import mongoose from "mongoose";
import SubjectModel from "../../models/SubjectModel";
const isValidObjectId = (_id) => mongoose.Types.ObjectId.isValid(_id);
/**
 *
 * @param {*} _
 * @param {*} param1
 */
const addSubject = async (_, { subjectName }) => {
  if (!subjectName) throw Error("User input error");
  const existingSubject = await SubjectModel.findOne({
    subjectName: subjectName.trim(),
  });
  console.log({ existingSubject });
  if (existingSubject) throw Error("This sub Subject already exists");
  const subject = new SubjectModel({ subjectName });
  await subject.save();
  return subject;
};
const deleteSubject = async (_, { subjectId }, { req, res }) => {
  if (!isValidObjectId(subjectId)) throw Error("Invalid Topic ID");
  const updatedSubjectDocument = await SubjectModel.findOneAndRemove(
    { _id: subjectId },
    { useFindAndModify: false, new: true }
  );
  console.log({ updatedSubjectDocument });
  if (!updatedSubjectDocument)
    throw Error("No subject found to delete with subject id " + subjectId);
  return updatedSubjectDocument;
};
/**
 *
 * @param {*} _
 * @param {*} param1
 */
const findSubjectByIdAndUpdate = async (
  _,
  { subjectId, subjectUpdateOption }
) => {
  if (!isValidObjectId(subjectId)) throw Error("Invalid Topic ID");
  console.log({ subjectId, subjectUpdateOption });
  try {
    const updatedTopicDocument = await SubjectModel.findOneAndUpdate(
      { _id: subjectId },
      {
        subjectName: subjectUpdateOption.subjectName,
      },
      { useFindAndModify: false, new: true }
    );
    console.log({ updatedTopicDocument });
    if (!updatedTopicDocument) throw Error("Failed to update");

    return updatedTopicDocument;
  } catch (error) {
    throw Error(error);
  }
};
/**
 *
 * @param {*} _
 * @param {*} param1
 */
const getSubjectById = async (_, { subjectId }) => {
  console.log({ subjectId });
  if (!isValidObjectId(subjectId)) throw Error("Invalide Subject id");
  const subject = await SubjectModel.findById(subjectId);
  if (!subject) throw Error("No subject found");
  return subject;
};
/**
 *
 * @param {*} _
 * @param {*} args
 */
const getAllSubjects = async (_, args) => {
  const subjects = await SubjectModel.find();
  return subjects;
};

const subjectResolvers = {
  Query: {
    getAllSubjects,
    getSubjectById,
  },
  Mutation: {
    addSubject,
    deleteSubject,
    findSubjectByIdAndUpdate,
  },
};
//TODO: add insert many collection at a time for subject, topic, subtopic and others too
//TODO:include text search for each field search by topic search by subtopic...
export { subjectResolvers };
