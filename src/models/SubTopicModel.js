import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const subtopicSubSchema = new Schema({
  subTopic: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
});

const SubTopicSchema = new Schema({
  topicId: { type: ObjectId, ref: "TopicSubDocument" },
  subTopics: [subtopicSubSchema],
});
/**
 * https://stackoverflow.com/questions/24853383/mongoose-objectid-that-references-a-sub-document
 */

SubTopicSchema.pre("validate", function validate(next) {
  let unique = [];

  for (let i = 0, l = this.subTopics.length; i < l; i++) {
    let prop = `${this.subTopics[i].subTopic}-${this.topicId}`;

    if (unique.indexOf(prop) > -1) {
      console.log("There is a Duplicated sub document!. " + prop);
      return next(new Error("There is a Duplicated sub document!. " + prop));
    }

    unique.push(prop);
  }

  next();
});

const SubTopicModel = model("SubTopic", SubTopicSchema);
export default SubTopicModel;
