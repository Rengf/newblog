import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/globle/Home'
import Login from '@/views/globle/Login'
import Regist from '@/views/globle/Regist'
import Admin from '@/views/admin/Admin'
import Publish from '@/views/admin/Publish'
import User from '@/views/admin/user'
import Category from '@/views/admin/Category'
import ArticleList from '@/components/home/ArticleList'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home,
        children: [{
            path: '/ArticleList',
            component: ArticleList
        }, {
            path: '/category',
            component: ArticleList
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
            path: '/Category',
            name: 'Category',
            component: Category
        }]
    }]
})