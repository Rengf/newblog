<template>
    <div class="warp">
        <my-header></my-header>
        <div class="login">
            <span class="title">登录</span>
            <div class="content">
                <div class="accountLogin">
                    <div class="form-group">
                        <label for="username" class="control-lable">账户</label>
                        <input type="text" v-model="username" placeholder="账号" class="inputtext" autocomplete="off">
                        <span class="msg">{{usernamewaring}}</span>
                    </div>
                    <div class="form-group">
                        <label for="password" class="control-lable">密码</label>
                        <input type="password" v-model="password" @keyup.enter="login" placeholder="密码" autocomplete="off">
                        <span class="msg">{{passwordwaring}}</span>
                    </div>
                    <div class="form-group">
                        <button @click="login" style="margin: 0;width: 100%;height: 48px;font-size: 18px;line-height: 48px">登录</button>
                    </div>
                    <div class="form-group">
                        <span class="msg" style="top: 0;left: 0;color: #d44d44">{{accountwarning}}</span>
                        <span>如果您还没有账户，则可在此</span>
                        <router-link style="padding: 0 5px" :to="{path:'/Regist'}">注册</router-link>
                    </div>
                </div>
                <div class="otherLogin">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import MyHeader from "../../components/home/MyHeader";
export default {
    name: 'Login',
    data(){
        return {
            user:{},
            username: '',
            password: '',
            usernamewaring:'',
            passwordwaring:'',
            accountwarning:'',
            isAdmin:false,
        }
    },
    created() {
       
    },
    methods:{
         login() {
            if (this.username == "") {
                this.usernamewaring = "用户名不能为空";
                return;
            }
            if (this.password == "") {
                this.warningInfo = "密码不能为空";
                return;
            }
            axios.post("/api/user/login", {
                    username: this.username,
                    password: this.password
                })
                .then(
                    response => {
                        if (response.data.code != 0) {
                            this.accountwarning = response.data.message;
                            return;
                        } else {
                            alert(response.data.message)
                            this.isAdmin = response.data.userInfo.isAdmin;
                            this.username = response.data.userInfo.username;
                            this.user = response.data.userInfo;
                            this.$router.push('/')
                        }
                    },
                    response => {
                        console.log("error:" + response);
                    }
                );
        }
    },
    components: {
        MyHeader
    }
};
</script>
<style scoped>
.login {
    border-top: 2px solid #25bb9b;
    width: 960px;
    margin: auto;
}
.title {
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 83px;
    line-height: 83px;
    color: #25bb9b;
    font-size: 25px;
    border-bottom: 1px solid #ccc;
}
.accountLogin,
.otherLogin {
    width: 50%;
}
.control-lable {
    padding: 0 15px;
    font-size: 14px;
    float: left;
    width: 80px;
    line-height: 42px;
    height: 42px;
    text-align: right;
    margin-bottom: 0;
}
.form-group {
    height: 70px;
}
input {
    border-radius: 3px;
    height: 42px;
    border: 1px solid #ccc;
    background-color: #fff;
    box-sizing: border-box;
    color: #000;
}
input:focus {
    border: 1px solid #333;
    outline: none;
}
</style>
