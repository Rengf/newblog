<template>
  <div class="content">
      <div class="header">
            <ul>
                <li>编号</li>
                <li>标题</li>
                <li>作者</li>
                <li>类别</li>
                <li>发布时间</li>
                <li>操作</li>
            </ul>
        </div>
        <div class="body">
            <div class="nav" v-for="(article,index) in articles">
                <ul>
                    <li >{{index+1}}</li>
                    <li :title=article.title>{{article.title}}</li>
                    <li>{{article.author}}</li>
                    <li>{{article.category&&article.category.categoryName?article.category.categoryName:''}}</li>
                    <li>{{article.addTime}}</li>
                    <li class="editArticle">
                        <a @click="deleteArticle(article._id)">删除</a>
                        <router-link :to="{path:'/Admin/ArticleEdit',query:{id:article._id}}">编辑</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <pager :url="url" @getData="getData" v-if="render"></pager>
  </div>
</template>
<script>
import Pager from "../../components/pager";
import axios from "axios";
export default {
  name: "ArticleManagement",
  data() {
    return {
      articles: [],
      render:false,
      url:"/admin/article?page="
    };
  },
  methods: {
    getData(response) {
          this.articles = response.data.article;
    },
    deleteArticle(id) {
      axios.get("/admin/article/delete?id=" + id).then(
        response => {
          axios.get("/admin/article").then(
            response => {
              this.count = response.data.count;
              this.limit = response.data.limit;
              this.page = response.data.page;
              this.pages = response.data.pages;
              this.articles = response.data.article;
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
  components: {
    Pager
  }
};
</script>
<style scoped>
.content {
  width: 89%;
  float: left;
}
ul {
  list-style: none;
}
li {
  display: inline-block;
  width: 16%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.header {
  border-bottom: 2px solid #888;
}
.nav {
  border-bottom: 1px solid #ccc;
  margin: 10px auto;
}
a {
  display: inline-block;
  margin-left: 15%;
  width: 30%;
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
