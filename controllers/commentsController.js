const Comment = require('../models/comment');
const Post = require('../models/post');

//Users can see all comments for a specific post
exports.getCommentsForPostId = function(req, res, next) {
    res.send('NOT IMPLEMENTED YET')
};

//Users can post a new comment to the post they are on
exports.postCommentForPostId = [];

//Admin can delete posts
exports.deleteCommentByCommentId = function(req, res, next) {
    res.send('Not implemented yet')
};