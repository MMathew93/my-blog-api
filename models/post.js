let mongoose = require('mongoose');
let dayjs = require('dayjs');
let Schema = mongoose.Schema;

let PostSchema = new Schema(
    {
        title: { type: String, required: true, maxlength: 120 },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
        postedDate: { type: Date, required: true, default: new Date() },
        body: { type: String, required: true, maxlength: 6000 },
        isPublished: { type: String, required: true, enum: ['draft', 'published'], default: 'draft' }
    }
);

PostSchema
.virtual('formattedDate')
.get(function() {
    return dayjs(this.postedDate).format('MM/DD/YYYY');
});

PostSchema
.virtual('publishStatus')
.get(function() {
    return this.isPublished === 'published'
});

module.exports = mongoose.model('Post', PostSchema);