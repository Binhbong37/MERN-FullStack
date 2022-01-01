const Post = require("../models/Posts-model");

// [GET] /posts/
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    console.log(posts);

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

// [POST] /posts/
exports.postCreatePost = async (req, res) => {
  try {
    const newPost = req.body;
    const savePost = new Post(newPost);
    await savePost.save();
    console.log("Created POST");

    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

// [UPDATE] /posts/
exports.updatePost = async (req, res) => {
  try {
    const updatePost = req.body;
    const newPost = await Post.findOneAndUpdate(
      { _id: updatePost._id },
      updatePost,
      { new: true }
    );

    console.log("UPDATED POST");

    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
