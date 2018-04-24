<template>
  <div class="content">
      <div class="article">
          <div class="articleTitle">
               <h4>{{title}}</h4>
          </div>
          <div class="articleMessage">
              <span>发布时间：{{addTime}}</span>
              <span>类别：{{categoryName}}</span>
              <span>阅读量：{{views}}</span>
              <span>评论：{{commentsLength}}</span>
          </div>
          <div class="articleContent" v-html="compiledMarkdown"></div>
      </div>
      <comment :article='article' @getData='getData'></comment>
  </div>
</template>
<script>
    import axios from 'axios'
    import comment from './comments.vue'
    export default{
        name:'ArticleDetail',
        data(){
            return{
                article:[],
                title:'',
                addTime:'',
                categoryName:'',
                views:0,
                commentsLength:0
            }
        },
        created(){
            this.getData();
        },
        methods:{
            getData(){
                axios.get("/main/view?id="+this.$route.query["id"]).then(response=>{
                this.article=response.data.article;
                this.title=this.article.title;
                this.addtime=this.article.addTime.substring(0,10);
                this.categoryName=this.article.category.categoryName;
                this.views=this.article.views;
                this.commentsLength=this.article.comments.length;
            },
            response=>{
                console.log("error:"+response)
            })
            }
        },
        computed:{
            compiledMarkdown:function(){
                return this.article.content
            }
        },
        components:{
            comment,
        }
    }
</script>
<style scoped>
.content{
  width: 69%;
  float: left;
  border: 1px solid #ccc;
}
.articleTitle{
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #222;
    font-size: 20px;
    text-align: center
}
.articleMessage{
    width:100%;
    font-size: 10px;
    color:#555;
    font-weight: bold;
    text-align: center;
}
.articleMessage span{
    display: inline-block;
    margin: 0 9px;
}
.articleContent{
    width:90%;
    margin: auto;
}
.articleContent{
    text-indent: 2em;
    color: #333;
    font-size: 15px;
    line-height: 30px;
}
</style>
