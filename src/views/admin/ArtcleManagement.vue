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
                    <li>{{index+1}}</li>
                    <li>{{article.title}}</li>
                    <li>{{article.author}}</li>
                    <li>{{article.category.categoryName}}</li>
                    <li>{{article.addTime}}</li>
                    <li class="editArticle">
                        <a @click="deleteArticle(article._id)">删除</a>
                        <a @click="editArticle(article._id)">编辑</a>
                    </li>
                </ul>
            </div>
        </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ArticleManagement",
  data() {
    return {
      articles: []
    };
  },
  created() {
    axios.get("http://localhost:3000/admin/article").then(
      response => {
        this.articles = response.data.article;
      },
      response => {
        console.log("error:" + response);
      }
    );
  },
  methods: {
    deleteArticle(id) {
      axios.get("http://localhost:3000/admin/article/delete?id=" + id).then(response => {
          axios.get("http://localhost:3000/admin/article").then(
            response => {
              this.articles = response.data.article;
            },
            response => {
              console.log("error:" + response);
            }
          );
        },
        response=>{
            console.log("error:" + response);
        });
    }
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
