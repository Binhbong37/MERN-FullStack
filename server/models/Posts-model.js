const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String, require: true },
    content: { type: String, require: true },
    attachment: { type: String },
    author: {
      type: String,
      require: true,
      default: "Anonymous",
    },
    likeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
