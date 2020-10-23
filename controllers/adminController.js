require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let token = jwt.sign({ foo: 'bar' }, process.env.TOKEN)
const Admin = require('../models/admin');

//Authorize on admin
exports.postAdminLogin = [

];