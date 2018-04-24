var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Category = require('../models/category')
var Article = require('../models/article')

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
router.get('/', function(req, res, next) {
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

/*分类添加*/
router.post('/category/add', function(req, res, next) {
    var categoryName = req.body.categoryName || '';
    Category.findOne({
        categoryName: categoryName,
    }).then(function(res) {
        if (res) {
            responseData.message = '已存在该类别';
            responseData.code = 1;
            res.json(responseData);
            return Promise.reject();
        } else {
            return new Category({
                categoryName: categoryName,
                addTime: new Date().Format("yyyy-MM-dd HH:mm:ss"),
            }).save();
        }
    }).then(function(newCategory) {
        responseData.message = '分类添加成功';
        responseData.code = 0;
        res.json(responseData);
    })
})

/*分类管理*/
router.get('/category', function(req, res, next) {
    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    Category.count().then(function(count) {
        pages = Math.ceil(count / limit);
        var skip = (page - 1) * limit;
        Category.find().limit(limit).skip(skip).then(function(category) {
            res.json({
                userInfo: req.userInfo,
                category: category,
                page: page,
                pages: pages,
                count: count,
                limit: limit,
            });
        });
    })
})

/*分类删除*/
router.get('/category/delete', function(req, res, next) {
    // 获取要删除user的id
    var id = req.query.id;
    Category.remove({
        _id: id,
    }).then(function() {
        responseData.code = 0;
        responseData.message = '分类删除成功';
        res.json(responseData);
    })
})

/**编辑分类 */
router.get('/category/edit', function(req, res, next) {
    var id = req.body.id;
    Category.findOne({
        _id: id,
    }).then(function(category) {
        responseData.code = 0;
        responseData.message = '分类信息';
        responseData.category = category;
        res.json(responseData);
    })
})

router.post('/category/edit', function(req, res, next) {
    var id = req.body.id;
    var categoryName = req.body.categoryName || '';
    Category.findOne({
        _id: id
    }).then(function(category) {
        if (!category) {
            responseData.code = 1;
            responseData.message = '没有该分类';
            res.json(responseData);
            return Promise.reject();
        } else {
            if (categoryName == category.categoryName) {
                responseData.code = 0;
                responseData.message = '修改成功';
                res.json(responseData);
                return Promise.reject();
            } else {
                return Category.findOne({
                    _id: { $ne: id },
                    categoryName: categoryName
                })
            }
        }
    }).then(function(sameCategory) {
        if (sameCategory) {
            responseData.code = 1;
            responseData.message = '已有该分类';
            res.json(responseData);
            return Promise.reject();
        } else {
            return Category.update({
                _id: id
            }, {
                categoryName: categoryName
            })
        }
    }).then(function() {
        responseData.code = 0;
        responseData.message = '修改成功';
        res.json(responseData);
    })
})

/**添加文章 */
router.get('/article/add', function(req, res, next) {
    Category.find().sort({ _id: -1 }).then(function(category) {
        res.json({
            category: category
        })
    });
})
router.post('/article/add', function(req, res, next) {
    new Article({
        category: req.body.category,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        addTime: new Date().Format("yyyy-MM-dd HH:mm:ss"),
    }).save().then(function(newArticle) {
        responseData.code = 0;
        responseData.message = '文章发布成功';
        res.json(responseData)
    })
})

/**文章管理 */
router.get('/article', function(req, res, next) {
    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    Article.count().then(function(count) {
        pages = Math.ceil(count / limit);
        var skip = (page - 1) * limit;
        Article.find().sort({ _id: -1 }).limit(limit).skip(skip).populate('category').then(function(article) {
            res.json({
                article: article,
                page: page,
                pages: pages,
                count: count,
                limit: limit,
            })
        })
    })
})

/**编辑文章 */
router.get('/article/edit', function(req, res, next) {
    var id = req.query.id;
    Article.findOne({
        _id: id,
    }).then(function(article) {
        responseData.code = 0;
        responseData.message = '分类信息';
        responseData.article = article;
        res.json(responseData);
    })
})

router.post('/article/edit', function(req, res, next) {
    var id = req.query.id;
    var category = req.body.category;
    var title = req.body.title;
    var content = req.body.content;
    var author = req.body.author;
    var addTime = new Date().Format("yyyy-MM-dd HH:mm:ss");
    Article.findOne({
        _id: id
    }).then(function(article) {
        if (!article) {
            responseData.code = 1;
            responseData.message = '没有该文章';
            res.json(responseData);
            return Promise.reject();
        } else {
            return Article.update({
                _id: id
            }, {
                category: category,
                title: title,
                content: content,
                author: author,
                addTime: new Date().Format("yyyy-MM-dd HH:mm:ss"),
            })
        }
    }).then(function() {
        responseData.code = 0;
        responseData.message = '修改成功';
        res.json(responseData);
    })
})

/**文章删除 */
router.get('/article/delete', function(req, res, next) {
    var id = req.query.id;
    Article.remove({
        _id: id,
    }).then(function() {
        responseData.code = 0;
        responseData.message = '文章删除成功';
        res.json(responseData);
    })
})
module.exports = router;