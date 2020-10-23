var express = require('express');
var router = express.Router();
let commentController = required('../controllers/commentController');

router.get('/create', commentController.getCommentCreate);

router.post('/create', commentController.postCommentCreate);

module.exports = router;