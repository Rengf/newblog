var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/vueblog');
var Schema = mongoose.Schema;
var usreScheMa = new Schema({
    username: String,
    password: String
});
exports.user = db.model('user', userScheMa);