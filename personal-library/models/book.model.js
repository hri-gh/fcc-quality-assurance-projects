const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    comments: {
        type: [String],
        default: []
    },
    commentcount: {
        type: Number,
        default: 0
    },
});

const BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel;
