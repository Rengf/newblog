var express = require('express');
var router = express.Router();

var User = require('../models/user');

//统一返回格式
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
router.use(function(req, res, next) {
    if (req.userInfo == null || !req.userInfo.isAdmin) {
        responseData.code = 1;
        responseData.message = '你没有管理员权限';
        res.json(responseData);
        return;
    }
    next();
})

/*首页*/
router.get('', function(req, res, next) {
    responseData.code = 0;
    responseData.message = '管理员，您好，欢迎来到管理员界面';
    responseData.userInfo = req.userInfo;
    res.json(responseData);
})

/*用户管理*/
router.get('/user', function(req, res, next) {
    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    User.count().then(function(count) {
        pages = Math.ceil(count / limit);
        var skip = (page - 1) * limit;
        User.find().limit(limit).skip(skip).then(function(user) {
            res.json({
                userInfo: req.userInfo,
                user: user,
                page: page,
                pages: pages,
                count: count,
                limit: limit,
            });
        });
    })

})

/*用户删除*/
router.get('/user/delete', function(req, res, next) {
    // 获取要删除user的id
    var id = req.query.id;
    User.remove({
        _id: id,
    }).then(function() {
        responseData.code = 0;
        responseData.message = '用户删除成功';
        res.json(responseData);
    })
})
module.exports = router;