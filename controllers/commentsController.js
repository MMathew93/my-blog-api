const Comment = require('../models/comment');
const Post = require('../models/post');
const { body, validationResult, check } = require('express-validator');

//Users can see all comments for a specific post
exports.getCommentsForPostId = async (req, res, next) => {
    try {
        const comments = await Comment.find({
            post: req.postId
        }, 'username formattedDate text');
        res.json(comments)
    } catch (err) {
        console.error(err);
    }
};

//Users can post a new comment to the post they are on
exports.postCommentForPostId = [
    //validationFields
    body('username')
        .trim(),
    body('postedDate')
        .optional({ checkFalsy: true})
        .isISO8601(),
    body('text')
        .isLength({ min: 1 })
        .trim()
        .withMessage('Your post cannot be empty'),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.send(errors);
            } else {
                let comment = new Comment({
                    username: req.body.username ? req.body.username : 'Anonymous',
                    postedDate: new Date(),
                    text: req.body.text,
                    post: req.postId
                })
                await comment.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                });
                res.status(201);
                res.send();
            }
        } catch (err) {
            console.error(err);
        }
    }
];

//Admin can delete posts
exports.deleteCommentByCommentId = async (req, res, next) => {
    try {
        await jwt.verify(req.token, `${process.env.TOKENKEY}`, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                console.log(req.params.commentId)
                Comment.findByIdAndRemove(req.params.commentId);
                res.redirect('/');
            }
        });
    } catch (err) {
        console.error(err);
    }
};