<template>
  <div class="content">
      <div class="article">
          <div class="articleTitle">
               <h4>{{article.title}}</h4>
          </div>
          <div class="articleMessage">
              <span>发布时间：{{article.addTime.substring(0,10)}}</span>
              <span>类别：{{article.category.categoryName}}</span>
              <span>阅读量：{{article.views}}</span>
              <span>评论：{{article.comments.length}}</span>
          </div>
          <div class="articleContent" v-html="compiledMarkdown"></div>
      </div>
  </div>
</template>
<script>
    import axios from 'axios'
    import marked from 'marked'
    export default{
        name:'ArticleDetail',
        data(){
            return{
                article:[],
            }
        },
        created(){
            axios.get("http://localhost:3000/view?id="+this.$route.query["id"]).then(response=>{
                this.article=response.data.article
            })
        },
        computed:{
            compiledMarkdown:function(){
                return marked(this.article.content,{sanitize:true})
            }
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
