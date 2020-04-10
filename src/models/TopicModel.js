import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const TopicSchema = new Schema({
  subjectId: { type: ObjectId, ref: "Subject" },
  description: { type: String, trim: true, required: true, unique: true },
});
const TopicModel = model("Topic", TopicSchema);
export default TopicModel;
