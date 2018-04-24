var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Category = require('../models/category');
var Article = require('../models/article');

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
var responseData;
router.use(function(req, res, next) {
    responseData = {
        code: 0,
        message: '',
    }
    next();
})

/*  判断是否登录  */
router.get('/main/log', function(req, res, next) {
    responseData.userInfo = req.userInfo;
    res.json(responseData);
})

/**获取分类列表 */
router.get('/main/category', function(req, res, next) {
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
router.get('/main/article', function(req, res, next) {
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
router.get('/main/view', function(req, res, next) {
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

/**评论 */
router.post('/main/comment/post', function(req, res, next) {
    var articleId = req.body.articleId || '';
    if (req.userInfo) {
        var postData = {
            userName: req.body.userName,
            postTime: new Date().Format("yyyy-MM-dd HH:mm:ss"),
            commentContent: req.body.commentContent,
        }
        Article.findOne({
            _id: articleId,
        }).populate('category').then(function(article) {
            article.comments.unshift(postData);
            return article.save();
        }).then(function(newArticle) {
            responseData.message = '评论成功';
            responseData.data = newArticle;
            res.json(responseData);
        })
    } else {
        responseData.message = '评论失败';
        responseData.code = 404;
        res.json(responseData)
    }
})
module.exports = router;