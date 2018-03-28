var express = require('express');
var router = express.Router();
var User = require('../models/user')
var Category = require('../models/category')


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
    if (req.userInfo) {
        responseData.code = 0;
        responseData.message = '已登录';
    } else {
        responseData.code = 1;
        responseData.message = '未登录';
    }
    responseData.userInfo = req.userInfo;
    res.json(responseData);
})

/**获取分类列表 */
router.get('/category', function(req, res, next) {
    page = Number(req.query.page || 1);
    limit = 10;
    pages = 0;
    Category.count().then(function(count) {
        pages = Math.ceil(count / limit);
        var skip = (page - 1) * limit;
        Category.find().limit(limit).skip(skip).then(function(category) {
            res.json({
                category: category,
                page: page,
                pages: pages,
                count: count,
                limit: limit,
            });
        });
    })
})


module.exports = router;