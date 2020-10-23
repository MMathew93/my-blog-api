var express = require('express');
var router = express.Router();
let postController = required('../controllers/postController');

router.get('/create', postController.getPostCreate);

router.post('/create', postController.postPostCreate);

module.exports = router;