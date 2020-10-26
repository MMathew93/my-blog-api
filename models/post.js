let mongoose = require('mongoose');
let dayjs = require('dayjs');
let Schema = mongoose.Schema;

let PostSchema = new Schema(
    {
        title: { type: String, required: true, maxlength: 120 },
        postedDate: { type: Date, required: true, default: new Date() },
        text: { type: String, required: true, maxlength: 6000 },
        isPublished: { type: Boolean, default: false }
    }
);

PostSchema
.virtual('formattedDate')
.get(function() {
    return dayjs(this.postedDate).format('MM/DD/YYYY');
});

module.exports = mongoose.model('Post', PostSchema);