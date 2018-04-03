var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Category = require('../models/category');
var Article = require('../models/article');


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
    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;
    Category.count().then(function(count) {
        var pages = Math.ceil(count / limit);
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

/**获取文章列表 */
var data = {};
router.get('/article', function(req, res, next) {
    data.category = req.query.id || '';
    data.count = 0
    data.page = Number(req.query.page || 1);
    data.limit = 5;
    data.pages = 0;
    var belong = {};
    if (data.category) {
        belong.category = data.category;
    }
    Article.where(belong).count().then(function(count) {
        data.count = count;
        data.pages = Math.ceil(data.count / data.limit);
        data.page = Math.min(data.page, data.pages);
        data.page = Math.max(data.page, 1);
        var skip = (data.page - 1) * data.limit;
        return Article.find().where(belong).sort({ addTime: -1 }).limit(data.limit).skip(skip).populate('category')
    }).then(function(article) {
        data.article = article;
        responseData = data;
        res.json(data)
    })

})

/*获取文章详情页*/
router.get('/view', function(req, res, next) {
    var id = req.query.id;
    Article.findOne({
        _id: id,
    }).populate('category').then(function(article) {
        article.views = article.views + 1;
        article.save();
        responseData.article = article;
        res.json(responseData)
    })
})

module.exports = router;