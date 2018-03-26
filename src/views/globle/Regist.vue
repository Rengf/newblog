<template>
    <div class="warp">
        <my-header></my-header>
        <div class="regist">
            <span class="title">注册</span>
            <div class="content">
                <div class="accountRegist">
                    <div class="form-group">
                        <label for="username" class="control-lable">账户</label>
                        <input type="text" v-model="username" placeholder="请输入电话号码" class="inputtext" autocomplete="off">
                        <span class="msg">{{usernamewarning}}</span>
                    </div>
                    <div class="form-group">
                        <label for="password" class="control-lable">密码</label>
                        <input type="password" v-model="password" @keyup.enter="regist" placeholder="密码" autocomplete="off">
                        <span class="msg">{{passwordwarning}}</span>
                    </div>
                    <div class="form-group">
                        <label for="password" class="control-lable">重复密码</label>
                        <input type="password" v-model="repassword" @keyup.enter="regist" placeholder="重复密码" autocomplete="off">
                        <span class="msg">{{repasswordwarning}}</span>
                    </div>
                    <div class="form-group">
                        <button @click="regist" style="margin: 0;width: 100%;height: 48px;font-size: 18px;line-height: 48px">注册</button>
                    </div>
                    <div class="form-group">
                        <span class="msg" style="top: 0;left: 0;color: #d44d44">{{accountwarning}}</span>
                        <span>如果您已有账户，则可在此</span>
                        <router-link style="padding: 0 5px" :to="{path:'/Login'}">登录</router-link>
                    </div>
                </div>
                <div class="otherRegist">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import MyHeader from "../../components/home/MyHeader";
export default {
    name: 'Regist',
    data() {
        return {
            username: '',
            password: '',
            repassword:'',
            usernamewarning:'',
            passwordwarning:'',
            repasswordwarning:'',
            accountwarning:'',
        }
    },
    created() {
       
    },
    methods: {
        regist() {
            if (this.username == "") {
                this.usernamewarning = "用户名不能为空";
                return;
            }
            if (this.password == "") {
                this.passwordwarning = "密码不能为空";
                return;
            }
            if (this.password != this.repassword) {
                this.repasswordwarning = "两次输入的密码不一致";
                return;
            }
            axios.post("http://localhost:3000/api/user/register", {
                    username: this.username,
                    password: this.password,
                    repassword: this.repassword
                })
                .then(response => {
                    if (response.data.code != 0) {
                        this.accountwarning = response.data.message;
                        return;
                    } else {
                        alert(response.data.message)
                    }
                },response=>{
    console.log('error:'+response);
  });
        }
    },
    components: {
        MyHeader
    }
};
</script>
<style scoped>
.regist {
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
.accountRegist,
.otherRegist {
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