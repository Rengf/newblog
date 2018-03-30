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

export default new Router({
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
        }, {
            path: '/Publish',
            name: 'Publish',
            component: Publish
        }, {
            path: '/User',
            name: 'User',
            component: User
        }, {
            path: '/Categories',
            name: 'Categories',
            component: Categories
        }, {
            path: '/ArticleManagement',
            name: 'ArticleManagement',
            component: ArticleManagement
        }]
    }]
})