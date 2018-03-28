var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    title: String,
    content: {
        type: String,
        default: '',
    },
    author: {
        type: String,
        default: null,
    },
    views: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
        default: [],
    }
});