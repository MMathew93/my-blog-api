let mongoose = require('mongoose');
let dayjs = require('dayjs');
let Schema = mongoose.Schema;

let CommentSchema = new Schema(
    {
        username: { type: String, required: true, maxlength: 30 },
        postedDate: { type: Date, required: true, default: new Date() },
        text: { type: String, required: true, maxlength: 255 },
        post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
    }
);

CommentSchema
.virtual('formattedDate')
.get(function() {
    return dayjs(this.postedDate).format('MM/DD/YYYY');
});

module.exports = mongoose.model('Comment', CommentSchema);