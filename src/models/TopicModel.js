import { Schema, model } from "mongoose";

const TopicSchema = new Schema({
  description: { type: String, trim: true, required: true, unique: true }
});
const TopicModel = model("Topic", TopicSchema);
export default TopicModel;
