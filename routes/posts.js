var express = require('express');
var router = express.Router();
const postsController = require('../controllers/postsController');
const adminController = require('../controllers/adminController');

//GET all posts
router.get('/', adminController.verifyToken, postsController.getAllPosts);

//GET all Published Posts
router.get('/published', postsController.getPublishedPosts);

//GET Specific Post
router.get('/:postId', postsController.getPostById);

//POST new Post
router.post('/create', adminController.verifyToken, postsController.postCreateNewPost);

//UPDATE specific Post
router.put('/update/:postId', adminController.verifyToken, postsController.putUpdatePostId);

//DELETE specific Post
router.delete('/delete/:postId', adminController.verifyToken, postsController.deletePostId);

module.exports = router;