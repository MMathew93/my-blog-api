let Post = require('../models/post');
const { body, validationResult, check } = require('express-validator');
const jwt = require('jsonwebtoken');

//Admin auth to get all posts
exports.getAllPosts = async (req, res, next) => {
    try {
        await jwt.verify(req.token, process.env.TOKENKEY, async (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const allPosts = await Post.find();
                res.json(allPosts);
            }
        });
    } catch (err) {
        console.error(err);
    };
};

//Users can get only published posts
exports.getPublishedPosts = async (req, res, next) => {
    try {
        const publishedPosts = await Post.find({
            isPublished: true
        }, 'title postedDate text');
        res.json(publishedPosts);
    } catch (err) {
        console.error(err);
    };
};

//users can select specific posts to read
exports.getPostById = async (req, res, next) => {
    const post = await Post.findById({
        _id: req.params.postId
    }, 'title postedDate text');
    res.json(post)
};

//Admin posts new posts
exports.postCreateNewPost = [
    //validationFields
    body('title')
        .isLength({ min: 1 })
        .trim()
        .withMessage('Title cannot be empty'),
    body('postedDate')
        .optional({ checkFalsy: true })
        .isISO8601(),
    body('text')
        .isLength({ min: 1 })
        .trim()
        .withMessage('Your post cannot be empty'),
        async (req, res, next) => {
            try {
                await jwt.verify(req.token, `${process.env.TOKENKEY}`, async (err) => {
                    if (err) {
                        res.sendStatus(403);
                    } else {
                        const errors = validationResult(req);
                        if (!errors.isEmpty()) {
                            res.send(errors);
                        } else {
                            let post = new Post({
                                title: req.body.title,
                                postedDate: new Date(),
                                text: req.body.text,
                                isPublished: req.body.isPublished
                            })
                            await post.save(function (err) {
                                if (err) {
                                    return next(err);
                                }
                            });
                            res.status(201);
                            res.send();
                        }
                    }
                });
            } catch (err) {
                console.error(err);
            }
        }
    ]


//Admin updates posts
exports.putUpdatePostId =[
    //validationFields
    body('title')
        .isLength({ min: 1 })
        .trim()
        .withMessage('Title cannot be empty'),
    body('postedDate')
        .optional({ checkFalsy: true })
        .isISO8601(),
    body('text')
        .isLength({ min: 1 })
        .trim()
        .withMessage('Your post cannot be empty'),
        async (req, res, next) => {
            try {
                await jwt.verify(req.token, `${process.env.TOKENKEY}`, async (err) => {
                    if (err) {
                        res.sendStatus(403);
                    } else {
                        const errors = validationResult(req);
                        if (!errors.isEmpty()) {
                            res.send('Implement a resend of errors back to front end')
                        }else {
                            let post = {
                                title: req.body.title,
                                postedDate: new Date(),
                                text: req.body.text,
                                isPublished: req.body.isPublished,
                                _id: req.params.postId //THIS IS REQUIRED OR A NEW ID WILL BE ASSIGNED
                            }
                            await Post.findByIdAndUpdate(req.params.postId, post, {}, function (err) {
                                if (err) {
                                    return next(err);
                                }
                            });
                            res.status(201);
                            res.send();
                        }
                    }
                });
            } catch (err) {
                console.error(err);
            }
        }
    ];



//Admin deletes posts
exports.deletePostId = async (req, res, next) => {
    try {
        await jwt.verify(req.token, `${process.env.TOKENKEY}`, async (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                await Post.findByIdAndRemove(req.params.postId);
                res.redirect('/');
            }
        });
    } catch (err) {
        console.error(err);
    }
};