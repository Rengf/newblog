var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET home page. */
var responseData;
router.use(function(req, res, next) {
    responseData = {
        code: 0,
        message: '',
    }
    next();
});
Date.prototype.Format = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份         
            "d+": this.getDate(), //日         
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
            "H+": this.getHours(), //小时         
            "m+": this.getMinutes(), //分         
            "s+": this.getSeconds(), //秒         
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
            "S": this.getMilliseconds() //毫秒         
        };
        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    /*  注册   */
router.post('/user/register', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({
        username: username,
    }).then(function(userInfo) {
        if (userInfo) {
            responseData.code = 1;
            responseData.message = '用户名已被注册';
            res.json(responseData);
            return;
        }
        var user = new User({
            username: username,
            password: password,
            registtime: new Date().Format("yyyy-MM-dd HH:mm:ss"),
        })
        return user.save();
    }).then(function(newUserInfo) {
        responseData.message = '注册成功';
        res.json(responseData);
    })
})

/*  登录 */
router.post('/user/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({
        username: username,
        password: password,
    }).then(function(userInfo) {
        if (!userInfo) {
            responseData.code = 2;
            responseData = '用户名或密码错误';
            res.json(responseData);
            return;
        }
        responseData.message = '登录成功';
        responseData.userInfo = {
            _id: userInfo.id,
            username: username,
            isAdmin: userInfo.isAdmin,
        }
        req.cookies.set('userInfo', JSON.stringify({
            _id: userInfo.id,
            username: userInfo.username,
        }), { httpOnly: false })
        res.json(responseData);
        return;
    })
})

/* 退出 */
router.get('/user/logout', function(req, res, next) {
    req.cookies.set('userInfo', null);
    responseData.message = '退出登录';
    res.json(responseData);
    return;
})
module.exports = router;