const Post = require("../models/Post");

// [GET] /api/posts
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate(
      "user",
      "username"
    );

    res.json({
      message: "successfully method GET",
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};

// [POST] /api/posts
exports.postPosts = async (req, res, next) => {
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
      user: req.userId,
    });

    await newPost.save();

    res.json({ success: true, message: "Success learning!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internet server is Sap" });
  }
};

// [PUT] /api/posts/:id
exports.updatePost = async (req, res, next) => {
  const postId = req.params.id;
  const { title, description, url, status } = req.body;
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required!" });
  }
  try {
    let updatePost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };

    const postUpdateCondition = {
      _id: postId,
      user: req.userId,
    };
    updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, {
      new: true,
    });

    // Check tiep dk
    if (!updatePost) {
      return res.status(401).json({
        success: true,
        message: "Post not found or user not authorized",
      });
    }

    res.json({
      success: true,
      message: "Updated !!!",
      posts: updatePost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internet server is Sap" });
  }
};

// [DELETE] /api/post/:id
exports.deletePost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const postDeleteCondition = { _id: postId, user: req.userId };
    const deletePost = await Post.findOneAndDelete(postDeleteCondition);

    // Check xem co nguoi dung khong
    if (!deletePost) {
      return res.status(401).json({
        success: false,
        message: "Not delete",
      });
    }
    res.json({
      success: true,
      message: "DELETED !!!",
    });
  } catch (error) {}
};
