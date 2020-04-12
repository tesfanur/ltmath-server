import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

// const TopicSchema = new Schema({
//   subjectId: { type: ObjectId, ref: "Subject" },
//   topicsName: [{ type: String, trim: true, required: true, unique: true }],
// });

const SubTopicSchema = new Schema({
  topicId: { type: ObjectId, ref: "Topic" },
  subTopics: [
    { subTopic: { type: String, trim: true, required: true, unique: true } },
  ],
});

const SubTopicModel = model("SubTopic", SubTopicSchema);
export default SubTopicModel;
