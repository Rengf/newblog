var mongoose = require('mongoose');
var contentSchema = require('../schemas/article');
module.exports = mongoose.model('Content', contentSchema)