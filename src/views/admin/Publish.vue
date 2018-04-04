<template>
  <div class="content">
      <div class="form">
          <div class="articleTitle">
              <P>*文章标题</P>
              <input type="text" class="title" v-model="title" placeholder="文章标题" autofocus>
          </div>
          <div class="articleAuthor">
              <P>*文章作者</P>
              <input type="text" class="title" v-model="author" placeholder="文章作者">
          </div>
          <div class="articleContent">
              <p>*文章内容</p>
              <textarea id="editor" cols="30" rows="10" v-model="content" placeholder="文章内容"></textarea>
          </div>
          <p v-show="warningMsg">{{message}}</p>
          <div class="otherMsg">
              <div class="changCategory">
                <p>*选择分类</p>
                  <select name="category" v-model="selected" class="select">
                      <option disabled value="">请选择</option>
                      <option v-for="category in category" :key="category._id" :value="category._id">{{category.categoryName}}</option>
                  </select>
              </div>
              <div class="newCategory">
                  <p @click="showNewCategory" class="showNewCategory">*新建分类</p>
                  <div v-show="newCategory">
                      <p>*分类名称</p>
                      <input type="text" v-model="categoryName" placeholder="输入分类名称">
                      <button @click="addCategory">确认添加分类</button>
                      <p v-show="categoryMsg">{{categoryWarning}}</p>
                  </div>
              </div>
          </div>
          <div class="button">
              <button type="button" @click="publish">发布</button>
              <button type="button">存草稿</button>
          </div>
      </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Publish",
  data() {
    return {
      title: "",
      author: "",
      content: [],
      warningMsg: false,
      message: "",
      selected: "",
      category: [],
      categoryName: "",
      categoryMsg: false,
      categoryWarning: "",
      newCategory:false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData(){
      axios.get("http://localhost:3000/admin/article/add").then(
      response => {
        this.category = response.data.category;
      },
      response => {
        console.log("error:" + response);
      }
    );
    },
    addCategory() {
      if (this.categoryName == "") {
        (this.categoryWarning = "类名不能为空"), (this.categoryMsg = true);
        return;
      }
      axios.post("http://localhost:3000/admin/category/add", {
        categoryName: this.categoryName
      }).then(
          response => {
            if (response.data.code != 0) {
              this.categoryWarning = response.data.message;
              this.categoryMsg = true;
            } else {
              this.categoryWarning = response.data.message;
              this.categoryMsg = true;
              this.getData();
              this.categoryName = "";
            }
          },
          response => {
            console.log("error:" + response);
          }
        );
    },
    publish(){
        if(this.title==""||this.selected==""){
            this.message="标题或分类不能为空";
            this.warningMsg=true;
            return
        };
        axios.post("http://localhost:3000/admin/article/add",{
            title:this.title,
            author:this.author,
            category:this.selected,
            content:this.content,
        }).then(response=>{
                if(response.data.code==0){
                    this.message=response.data.message;
                    this.warningMsg=true;
                    var that=this;
                    setTimeout(function(){
                        that.$router.push({path:"/Admin/ArticleManagement"});
                    },3000);
                }else{
                    this.message=response.data.message;
                    this.warningMsg=true;
                }
            },
            response=>{
                console.log("error:"+response)
            })
    },
    showNewCategory(){
      this.newCategory=!this.newCategory
    }
  }
};
</script>
<style scoped>
.content{
  width: 89%;
  float: right;
}
.newCategory,
.changCategory,
.articleContent,
.articleTitle,
.articleAuthor{
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
p{
  height: 30px;
  line-height: 30px;
}
input{
  width: 300px;
  height: 30px;
  margin:0 5px;
  color: #333;
  font-weight: bold;
  text-indent: 1em;
}
textarea{
  width: 500px;
  height: 300px;
  overflow: scroll;
}
.select{
  width: 300px;
  height: 30px;
  color: dimgray;
  font-size: 15px;
  font-weight: bold;
}
.showNewCategory:hover{
  cursor: pointer;
}
button{
  width: 100px;
  height: 30px;
}
</style>
