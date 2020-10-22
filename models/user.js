let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AdminSchema = new Schema(
    {
        username: { type: String, required: true, maxlength: 30 },
        password: { type: String, required: true, maxlength: 100 }
    }
);

module.exports = mongoose.model('Admin', AdminSchema);