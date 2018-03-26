<template>
    <div class="header">
        <div class="loginBar">
            <div class="loginRegist" v-show="showLogin">
                <router-link :to="{path:'/Login'}" class="showLogin">登录</router-link>
                <router-link :to="{path:'/Regist'}" class="showRegist">注册</router-link>
            </div>
            <div class="showLogined" v-show="showLogined">
                <router-link class="userName" :to="{path:'/Admin'}" v-if="isAdmin">管理员</router-link>
                <router-link class="userName" :to="{path:'www.baidu.com'}" v-else="!isAdmin">{{username}}</router-link>
                <a href="javascript:;" @click="logout()" class="logout">退出</a>
            </div>
        </div>
        <div class="navBar">
            <ul class="menu">
                <li v-for="nav in navs" class="nav">
                    <router-link :to="{path:nav.href}">{{nav.title}}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "MyHeader",
    data() {
        return {
            showLogin: true,
            showLogined: false,
            username: '',
            isAdmin:false,
            navs: [
                { title: "首页", href: "/" },
                { title: "关于我", href: "/" },
                { title: "文章", href: "/" },
                { title: "留言", href: "/" }
            ]
        };
    },
    created() {
        axios.get("http://localhost:3000").then(
            response => {
                if (!response.data.code) {
                    this.showLogin = !this.showLogin;
                    this.showLogined = !this.showLogined;
                    this.username = response.data.userInfo.username;
                    this.isAdmin = response.data.userInfo.isAdmin;
                }
            },
            response => {
                console.log("error:" + response);
            }
        );
    },
    methods: {
        logout() {
            axios.get("http://localhost:3000/api/user/logout").then(
                response => {
                    this.showLogin = !this.showLogin;
                    this.showLogined = !this.showLogined;
                },
                response => {
                    console.log(response);
                }
            );
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginBar {
    height: 50px;
    border-bottom: 1px solid #888;
}
.showLogined{
    width: 500px;
    height: 50px;
    float: right;
}
.loginRegist {
    width: 300px;
    height: 50px;
    float: right;
}
.userName{
    width: 300px;
    display: inline-block;
    font-size: 25px;
    text-align: right;
    color: #555;
    line-height: 50px;
}
.logout,
.showLogin,
.showRegist {
    width: 100px;
    display: inline-block;
    font-size: 25px;
    text-align: center;
    color: #555;
    line-height: 50px;
}
.showLogin:hover,
.showRegist:hover {
    background: #ccc;
}
.menu {
    list-style: none;
    width: 500px;
    height: 50px;
    margin: auto;
}
.nav {
    width: 100px;
    height: 50px;
    float: left;
}
.nav a {
    display: block;
    width: 100px;
    height: 50px;
    color: #888;
    line-height: 50px;
    text-align: center;
}
.nav a:hover {
    background: #ccc;
}
</style>
