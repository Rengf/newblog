<template>
    <div class="content">
        <div class="header">
            <ul>
                <li>id</li>
                <li>用户名</li>
                <li>注册时间</li>
                <li>操作</li>
            </ul>
        </div>
        <div class="body">
            <div class="nav" v-for="(nav,index) in navs">
                <ul>
                    <li>{{index+1}}</li>
                    <li>{{nav.username}}</li>
                    <li>{{nav.registtime}}</li>
                    <li class="deleteUser">
                        <a @click="deleteUser(nav._id)">删除</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "user",
    data() {
        return {
            navs: [],
            count: 0,
            limit: 0,
            pages: 0,
            page: 1
        };
    },
    created() {
        axios.get("http://localhost:3000/admin/user").then(
            response => {
                this.count = response.data.count;
                this.limit = response.data.limit;
                this.page = response.data.page;
                this.pages = response.data.pages;
                this.navs = response.data.user;
            },
            response => {
                console.log("error:" + response);
            }
        );
    },
    methods: {
        deleteUser(id) {
            axios.get("http://localhost:3000/admin/user/delete?id=" + id).then(
                response => {
                    location.reload()
                },
                response => {
                    console.log("error:" + response);
                }
            );
        }
    }
};
</script>
<style scoped>
.content {
    width: 70%;
    float: left;
}
ul {
    list-style: none;
}
li {
    display: inline-block;
    width: 300px;
    height: 40px;
    text-align: center;
}
.header {
    border-bottom: 2px solid #888;
}
.nav {
    border-bottom: 1px solid #ccc;
    margin: 10px auto;
}
a {
    display: block;
    margin: auto;
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: #aaa;
    border-radius: 3px;
}
a:hover {
    background: #ccc;
    cursor: pointer;
}
</style>
