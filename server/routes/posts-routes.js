const express = require('express');

const verify = require('../middleware/middleware');

const router = express.Router();

const postController = require('../controller/post-controller');

router.get('/', verify, postController.getPosts);

router.post('/', verify, postController.postCreatePost);

router.put('/:id', verify, postController.updatePost);

router.delete('/:id', verify, postController.deletePost);

module.exports = router;
