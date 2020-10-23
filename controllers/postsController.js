const Post = require('../models/post');

let posts = [
    {
        title: 'First attempt at a post!',
        author: 'Me',
        postedDate: new Date(),
        body: 'Blah blah bahl bah;hlk',
        isPublished: 'draft'
    },
    {
        title: 'Second attempt at a post!',
        author: 'Me',
        postedDate: new Date(),
        body: 'asdfasdfasdfasdfasdfasdfasdf',
        isPublished: 'published'
    }
]

//Admin auth to get all posts
exports.getAllPosts = function(req, res, next) {
    res.json(posts);
}

//Users can get only published posts
exports.getPublishedPosts = function(req, res, next) {
    res.send('NOT IMPLEMENTED YET')
};

//users can select specific posts to read
exports.getPostById = function(req, res, next) {
    res.send('NOT IMPLEMENTED YET')
};

//Admin posts new posts
exports.postCreateNewPost = [];


//Admin updates posts
exports.putUpdatePostId = function(req, res, next) {
    res.send('NOT IMPLEMENTED YET')
};


//Admin deletes posts
exports.deletePostId = function(req, res, next) {
    res.send('NOT IMPLEMENTED YET')
};