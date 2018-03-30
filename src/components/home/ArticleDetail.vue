<template>
  <div class="content">
      <div class="article">
          <div class="articleTitle">
               <h4>{{article.title}}</h4>
          </div>
          <div class="articleMessage">
              <span>发布时间：{{article.addTime}}</span>
              <span>类别：{{article.category.categoryName}}</span>
              <span>阅读量：{{article.views}}</span>
              <span>评论：{{article.comments.length}}</span>
          </div>
          <div class="articleContent">{{article.content}}</div>
      </div>
  </div>
</template>
<script>
    import axios from 'axios'
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
        }
    }
</script>
<style>

</style>
