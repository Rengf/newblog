<template>
  <div class="articleList">
      <div class="articlelListItem" v-for="(article,index) in articles">
          <div class="articleTitle">
              <router-link :to="{path:'/ArticleDetail',query:{id:article._id}}">{{article.title}}</router-link>
            </div>
          <div class="articleContent">
              <article style="text-indent:2em">{{article.content.substring(0,200)}}......</article>
              <router-link :to="{path:'/ArticleDetail',query:{id:article._id}}" class="readAll">阅读全文>></router-link>
          </div>
          <div class="otherMesg">
              <span>发布日期：{{article.addTime.substring(0,10)}}</span>
              <span>作者：{{article.author}}</span>
              <span>阅读量：{{article.views}}</span>
          </div>
      </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ArticleList",
  data() {
    return {
      articles: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      var id = this.$route.query["id"] || "";
      axios.get("http://localhost:3000/article?id=" + id).then(response => {
        this.articles = response.data.article;
      });
    }
  },
  watch: {
    $route(to, from) {
      this.getData();
    }
  }
};
</script>
<style scoped>
.articlelListItem{
  width: 95%;
  margin:auto;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
}
.articleList {
  width: 69%;
  float: left;
  border: 1px solid #ccc;
}
.articleTitle{
  width: 100%;
  height: 30px;
  font-size: 15px;
  line-height: 30px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.articleTitle a{
  color:#333;
  font-weight: bold;

}
.readAll{
  margin-left: 78%;
  display: block;
  width: 100px;
  height: 30px;
  font-size: 13px;
  color:rgb(15, 19, 17);
  text-align: center;
  line-height: 30px;
}
.readAll:hover{
  text-decoration: underline;
}
.articleContent article{
  font-size: 12px;
  color:#555
}
.otherMesg{
  width:100%;
    font-size: 10px;
    color:#555;
    font-weight: bold;
}
.otherMesg span{
   display: inline-block;
  margin: 0 9px;
}
</style>
