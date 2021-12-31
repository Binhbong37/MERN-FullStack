const Post = require("../models/Post");

exports.getPost = async (req, res, next) => {
  const { title, description, url, status } = req.body;
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required!" });
  }
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      userId: "61ce8a3010c8bc33d4122a82",
    });

    await newPost.save();

    res.json({ success: true, message: "Success learning!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internet server is Sap" });
  }
};
