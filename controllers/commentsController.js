const Comment = require('../models/comment');
const Post = require('../models/post');
const { body, validationResult, check } = require('express-validator');

//Users can see all comments for a specific post
exports.getCommentsForPostId = async(req, res, next) => {
    try {
        const postId = await Post.findById(req.params.postId);
        const comments = await Comment.find({ post: postId});
        res.json(comments)
    }catch(err) {
        console.error(err);
    }
};

//Users can post a new comment to the post they are on
exports.postCommentForPostId = [
    //validationFields
    body('username')
        .trim()
        .isAlphanumeric()
        .withMessage('Username contains non-alphanumeric characters'),
    body('postedDate')
        .optional({ checkFalsy: true })
        .isISO8601(),
    body('text')
        .isLength({ min: 1})
        .trim()
        .withMessage('Your post cannot be empty'),
        async(req, res, next) => {
            try {
                const postId = await Post.findOne({_id: req.params.postId});
                const errors = await validationResult(req);
        
                if(!errors.isEmpty()) {
                    res.send('Implement a resend of errors back to front end')
                    console.log(postId)
                }else {
                    let comments = new Comment(
                        {
                            username: req.body.username,
                            postedDate: new Date(),
                            text: req.body.text,
                            post: post
                        }
                    )
                    await comments.save(function(err) {
                        if(err) { return next(err); }
                    });
                    res.status(201);
                    res.send(comments);
                }
            }catch(err) {
                console.error(err);
            }
        }
];

//Admin can delete posts
exports.deleteCommentByCommentId = function(req, res, next) {
    res.send('Not implemented yet')
};