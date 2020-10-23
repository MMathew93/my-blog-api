var express = require('express');
var router = express.Router();
const postsController = require('../controllers/postsController');

//GET all posts
router.get('/', postsController.getAllPosts);

//GET all Published Posts
router.get('/published', postsController.getPublishedPosts);

//GET Specific Post
router.get('/:postId', postsController.getPostById);

//POST new Post
router.post('/create', postsController.postCreateNewPost);

//UPDATE specific Post
router.put('/update/:postId', postsController.putUpdatePostId);

//DELETE specific Post
router.delete('/delete/:postId', postsController.deletePostId);

module.exports = router;