const Post = require('../models/Posts-model');

// [GET] /api/posts/
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', [
            'username',
        ]);

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server failed',
        });
    }
};

// [POST] /api/posts/
exports.postCreatePost = async (req, res) => {
    const { title, description, url, status } = req.body;
    if (!title) {
        return res.status(400).json({
            success: false,
            message: 'Title is required !!',
        });
    }
    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId,
        });
        await newPost.save();

        res.status(200).json({
            success: true,
            message: 'Created new Posts',
            posts: newPost,
        });
    } catch (error) {
        console.log('Server failed: ', error);
    }
};

// // [UPDATE] /posts/
exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, description, url, status } = req.body;
    if (!title) {
        return res.status(400).json({
            success: false,
            message: 'Title is required !!',
        });
    }
    try {
        let updatePost = {
            title,
            description: description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'TO LEARN',
        };
        const conditionUpdate = { _id: postId, user: req.userId };

        updatePost = await Post.findOneAndUpdate(conditionUpdate, updatePost, {
            new: true,
        });
        if (!updatePost) {
            return res.status(401).json({
                success: false,
                message: 'Post not found!!',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Updated Posts',
            posts: updatePost,
        });
    } catch (error) {
        console.log('Server failed: ', error);
    }
};

// [DELETE]
exports.deletePost = async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId };
        const deletePost = await Post.findOneAndDelete(postDeleteCondition);
        if (!deletePost) {
            return res.status(401).json({
                success: false,
                message: 'Post not found of user not ..',
            });
        }

        res.status(400).json({
            success: true,
            posts: deletePost,
        });
    } catch (error) {
        console.log('Server failed: ', error);
    }
};
