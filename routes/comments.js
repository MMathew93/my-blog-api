var express = require('express');
var router = express.Router();
const commentsController = require('../controllers/commentsController');
const adminController = require('../controllers/adminController');

//get comments for specific post id
router.get('/', commentsController.getCommentsForPostId);

//post a new comment to a specific post
router.post('/new', commentsController.postCommentForPostId);

//delete a comment from specific post
router.delete('/:commentId', adminController.verifyToken, commentsController.deleteCommentByCommentId);

module.exports = router;