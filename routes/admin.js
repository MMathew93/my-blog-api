var express = require('express');
var router = express.Router();
let adminController = required('../controllers/adminController');

router.post('/login', adminController.postUserLogin)

module.exports = router;
