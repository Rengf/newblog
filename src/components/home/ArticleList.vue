<template>
  <div class="articleList">
      <div class="articlelListItem" v-for="(article,index) in articles">
          <div class="articleTitle">
              <router-link :to="{path:'/ArticleList',query:{id:article._id}}">{{article.title}}</router-link>
            </div>
          <div class="articleContent">
              <article>{{article.content}}</article>
              <router-link :to="{path:'/ArticleList',query:{id:article._id}}" class="readAll">阅读全文</router-link>
          </div>
          <div class="otherMesg">
              <span>发布日期：{{article.addTime}}</span>
              <span>作者：{{article.author}}</span>
          </div>
      </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ArticleList",
  data() {
    return {};
  }
};
</script>
<style scoped>
.articleList {
  width: 69%;
  float: left;
  border: 1px solid #ccc;
  height: 300px;
}
</style>
