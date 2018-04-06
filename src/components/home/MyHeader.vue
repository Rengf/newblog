<template>
    <div class="header">
        <div class="loginBar">
            <div class="loginRegist" v-if="showLogin">
                <router-link :to="{path:'/Login'}" class="showLogin">登录</router-link>
                <router-link :to="{path:'/Regist'}" class="showRegist">注册</router-link>
            </div>
            <div class="showLogined" v-else>
                <router-link class="userName" :to="{path:'/Admin'}" v-if="isAdmin">管理员</router-link>
                <router-link class="userName" :to="{path:'www.baidu.com'}" v-else>{{username}}</router-link>
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

        axios.get("/main/log").then(
            response => {
               
                if (JSON.stringify(response.data.userInfo) == "{}"||String(response.data.userInfo)=="undefined") {
                    this.showLogin = true;
                }
                else{
                    this.showLogin=false
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
            axios.get("/api/user/logout").then(
                response => {
                    this.showLogin = !this.showLogin;
                    this.user={};
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
