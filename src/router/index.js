import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/globle/Home'
import Login from '@/views/globle/Login'
import Regist from '@/views/globle/Regist'
import Admin from '@/views/admin/Admin'
import Publish from '@/views/admin/Publish'
import User from '@/views/admin/user'
import Categories from '@/views/admin/Category'
import ArticleList from '@/components/home/ArticleList'
import ArticleManagement from '@/views/admin/ArtcleManagement'
import ArticleDetail from '@/components/home/ArticleDetail'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: Home,
        children: [{
            path: '/',
            component: ArticleList
        }, {
            path: '/category',
            component: ArticleList
        }, {
            path: '/ArticleDetail',
            component: ArticleDetail
        }]
    }, {
        path: '/Login',
        name: 'Login',
        component: Login
    }, {
        path: '/Regist',
        name: 'Regist',
        component: Regist
    }, {
        path: '/Admin',
        name: 'Admin',
        component: Admin,
        children: [{
            path: '/Admin',
            meta: {
                requireAuth: true,
            },
        }, {
            path: '/Publish',
            name: 'Publish',
            component: Publish,
            meta: {
                requireAuth: true,
            },
        }, {
            path: '/User',
            name: 'User',
            component: User,
            meta: {
                requireAuth: true,
            },
        }, {
            path: '/Categories',
            name: 'Categories',
            component: Categories,
            meta: {
                requireAuth: true,
            },
        }, {
            path: '/ArticleManagement',
            name: 'ArticleManagement',
            component: ArticleManagement,
            meta: {
                requireAuth: true,
            },
        }]
    }]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
        if (localStorage.getItem('username')) { // 判断是否登录
            next()
        } else { // 没登录则跳转到登录界面
            next({
                path: '/Login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})

export default router