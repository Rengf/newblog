import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/globle/Home'
import Login from '@/views/globle/Login'
import Regist from '@/views/globle/Regist'
import Admin from '@/views/admin/Admin'
import adminHome from '@/views/admin/adminHome'
import Publish from '@/views/admin/Publish'
import User from '@/views/admin/user'
import Categories from '@/views/admin/Category'
import ArticleList from '@/components/home/ArticleList'
import ArticleManagement from '@/views/admin/ArtcleManagement'
import ArticleDetail from '@/components/home/ArticleDetail'
import ArticleEdit from '@/views/admin/ArticleEdit'
import HeadPortrait from '@/views/globle/HeadPortrait'

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
        component: Admin,
        children: [{
            path: '/',
            component: adminHome
        }, {
            path: '/Admin/Publish',
            name: 'Publish',
            component: Publish,
            meta: {
                requireAuth: true,
            },
        }, {
            path: '/Admin/User',
            name: 'User',
            component: User,
            meta: {
                requireAuth: true,
            },
        }, {
            path: '/Admin/Categories',
            name: 'Categories',
            component: Categories,
            meta: {
                requireAuth: true,
            },
        }, {
            path: '/Admin/ArticleManagement',
            name: 'ArticleManagement',
            component: ArticleManagement,
            meta: {
                requireAuth: true,
            },
        }, {
            path: '/Admin/ArticleEdit',
            component: ArticleEdit,
            meta: {
                requireAuth: true,
            },
        }]
    }, {
        path: '/HeadPortrait',
        name: 'HeadPortrait',
        component: HeadPortrait,
    }]
})




export default router