import { Schema, model } from "mongoose";

const SubTopicSchema = new Schema({
  description: { type: String, trim: true, required: true, unique: true }
});

const SubTopicModel = model("SubTopic", SubTopicSchema);
export default SubTopicModel;
