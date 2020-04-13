// import uniqueValidator from "mongoose-unique-validator";
// import uniqueArrayPlugin from "mongoose-unique-array";
import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;
const topicSubSchema = new Schema(
  {
    topic: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
  }
  // { _id: false }
);

const TopicSchema = new Schema({
  subjectId: { type: ObjectId, ref: "Subject" },
  topics: [topicSubSchema],
});

TopicSchema.pre("validate", function validate(next) {
  let unique = [];

  for (let i = 0, l = this.topics.length; i < l; i++) {
    let prop = `${this.topics[i].topic}-${this.subjectId}`;

    if (unique.indexOf(prop) > -1) {
      console.log("There is a Duplicated sub document!. " + prop);
      return next(new Error("There is a Duplicated sub document!. " + prop));
    }

    unique.push(prop);
  }

  next();
});

// TopicSchema.plugin(uniqueValidator); //uniqueArrayPlugin
// TopicSchema.plugin(uniqueArrayPlugin);
const TopicModel = model("Topic", TopicSchema);
export default TopicModel;
