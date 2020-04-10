import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const SubTopicSchema = new Schema({
  description: { type: String, trim: true, required: true, unique: true },
  topicId: { type: ObjectId, ref: "Topic" },
});

const SubTopicModel = model("SubTopic", SubTopicSchema);
export default SubTopicModel;
