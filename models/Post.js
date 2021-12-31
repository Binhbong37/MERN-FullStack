const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  uri: { type: String, require: true },
  status: {
    type: String,
    enum: ["TO LEARN", "LEARNING", "LEARNED"],
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", require: true },
});

module.exports = mongoose.model("Post", postSchema);
