var express = require('express');
var router = express.Router();
const commentsController = require('../controllers/commentsController');

//get comments for specific post id
router.get('/', commentsController.getCommentsForPostId);

//post a new comment got a specific post
router.post('/create', commentsController.postCommentForPostId);

//delete a comment from specific post
router.delete('/:commentId', commentsController.deleteCommentByCommentId);

module.exports = router;