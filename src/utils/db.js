import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
let DB_CONNECTION = process.env.DB_URI_DEV || process.env.DB_URI_PROD;

function connectToDB() {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(DB_CONNECTION, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✔️  Now connected to MongoDB!"))
    .catch((err) => console.error("Something went wrong", err));

  mongoose.connection.on("error", (err) => {
    console.log(`DB connection error: ${err.message}`);
  });
}

export default connectToDB;
