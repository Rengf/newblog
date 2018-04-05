<template>
    <div class="comment">
        <div class="editing">
            <input type="textarea" :autosize="{minrow:2}" placeholder="写下你的评论" v-model="commentContent">
            <button @click="onComment">发表评论</button>
            <p v-if="warning">{{warningMessage}}</p>
        </div>
        <div class="commentList">
            <span>共{{article.comments.length}}条评论</span>
            <div class="commentItem" v-for="comment in article.comments">
                <div class="commentTopbar">
                    <span class="postMan">{{comment.userName}}：</span>
                    <span class="comentContent">{{comment.commentContent}}</span>
                </div>
                <div>
                    <span class="postTime">{{comment.postTime}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name:'comments',
    props:{
        article:{
            type:Object,
            required:true
        }
    },
  data() {
    return {
      commentContent: "",
      warning: false,
      warningMessage: "",
      userName:''
    };
  },
  created() {
  },
  methods: {
    onComment() {
        axios.get("http://localhost:3000").then(response=>{
        if(JSON.stringify(response.data.userInfo) == "{}"){
            this.warning=true;
            this.warningMessage="你还没有登录，请登录后评论！";
            return;
        }else{
            this.userName=response.data.userInfo.username;
            alert(this,userName)
        }
        })
        if(this.commentContent==''){
            this.warning=true;
            this.warningMessage="评论不能为空";
            return;
        }
        axios.post("http://localhost:3000/comment/post",{
            userName:this.userName,
            commentContent:this.commentContent,
            articleId:this.$route.query["id"],
        }).then(response=>{
            if(response.data.code==404){
                this.warningMessage=response.data.message;
                this.warning=true;
                return
            }else{
                this.commentContent='';
                this.article=response.data.data;
                this.article.comments.reverse();
                this.warningMessage=response.data.message;
                this.warning=true;
            }
        },
        response=>{
            console.log("error:"+response)
        })
    }
  }
};
</script>
<style scoped>
.comment{
    width:95%;
    margin:auto;
}
.warning{
    color:#999;
    font-weight: bold;
}
.editing input{
    width:80%;
    height: 30px;
    border-radius: 5px;
    padding: 0 10px;
    font-weight: bold;
    color:#999;
}
.editing button{
    height: 30px;
    border-radius: 5px;
    background: #abc;
    font-weight: bold;
}
.editing input:focus,.editing button:focus{
    outline: none;
}
.postTime,.postMan{
    color:#8cc6ff;
}
</style>
