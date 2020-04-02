import { Schema, model } from "mongoose";

const SubTopicSchema = new Schema({
  description: { type: String }
});

const SubTopicModel = model("SubTopic", SubTopicSchema);
export default SubTopicModel;
