const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const { body, validationResult, check } = require('express-validator');

//Authorize on admin
exports.postAdminLogin = [
    //validationFields
    body('username')
        .trim()
        .isLength({ min: 1})
        .withMessage('Username cannot be empty'),
    body('password')
        .trim()
        .isLength({ min: 1})
        .withMessage('password cannot be empty'),
        async(req, res, next) => {
            try{
                const errors = validationResult(req);
                if(!errors.isEmpty()) {
                    res.json(errors)
                }else {
                    await Admin.findOne({username: `${req.body.username}` }, (err, admin) => {
                        if(err) { return next(err); }
                        if(admin) {
                            const isValid = bcrypt.compare(req.body.password, admin.password);
                            if(isValid) {
                                //DO JWT TOKEN STUFF HERE
                                jwt.sign({ admin }, `${process.env.TOKENKEY}`, { expiresIn: '1 day'}, (err, token) => {
                                    res.json({
                                        token
                                    });
                                });
                            }else {
                                res.json({message: "Password is incorrect"});
                            }
                        }else {
                            res.json({message: "Username is incorrect"});
                        }
                    });
                }
            }catch(err) {
                console.error(err);
            }
        }
];

exports.verifyToken = (req, res, next) => {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else {
        res.sendStatus(403);
    }
};