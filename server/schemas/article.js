var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    },
    categoryName: {
        type: String,
        default: ''
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
    },
    addTime: {
        type: String,
        default: "2018-03-30 12:00"
    }
});