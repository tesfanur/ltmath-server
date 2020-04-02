import { Schema, model } from "mongoose";

const TopicSchema = new Schema({
  description: { type: String }
});
const TopicModel = model("Topic", TopicSchema);
export default TopicModel;
