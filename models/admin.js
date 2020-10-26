let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AdminSchema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true }
    }
);

module.exports = mongoose.model('Admin', AdminSchema);