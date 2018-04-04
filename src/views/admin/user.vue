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
                    <li>
                        <a @click="deleteUser(nav._id)">删除</a>
                    </li>
                </ul>
            </div>
        </div>
        <pager :url="url" @getData="getData" v-show="render"></pager>
    </div>
</template>
<script>
import axios from "axios";
import Pager from "../../components/pager"
export default {
    name: "user",
    data() {
        return {
            navs: [],
            url:"http://localhost:3000/admin/user?page=",
            render:true,
        };
    },
    methods: {
        getData(response){
            this.navs=response.data.user;
        },
        deleteUser(id) {
            axios.get("http://localhost:3000/admin/user/delete?id=" + id).then(
                response => {
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
                response => {
                    console.log("error:" + response);
                }
            );
        }
    },
    components:{
        Pager
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
    width: 24%;
    height: 40px;
    text-align: center;
     line-height: 40px;
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
