var express = require('express');
var router = express.Router();
var User = require('../models/user')


var responseData;
router.use(function(req, res, next) {
    responseData = {
        code: 0,
        message: '',
    }
    next();
})

/*  判断是否登录  */
router.get('/', function(req, res, next) {
    User.find().then(function(user) {
        responseData.user = user;
        if (req.userInfo) {
            responseData.code = 0;
            responseData.message = '已登录';
        } else {
            responseData.code = 1;
            responseData.message = '未登录';
        }
        responseData.userInfo = req.userInfo;
        res.json(responseData);
    });
})
module.exports = router;