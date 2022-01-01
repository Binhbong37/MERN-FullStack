const express = require("express");

// const verify = require("../middleware/middleware");

const router = express.Router();

const postController = require("../controller/post-controller");

router.get("/", postController.getPosts);

router.post("/", postController.postCreatePost);

router.post("/update", postController.updatePost);

module.exports = router;
