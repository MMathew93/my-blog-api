var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.postAdminLogin)

module.exports = router;