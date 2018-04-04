<template>
  <div class="content">
       <div class="header">
            <ul>
                <li>编号</li>
                <li>类名</li>
                <li>添加时间</li>
                <li>操作</li>
            </ul>
        </div>
        <div class="body">
            <div class="nav" v-for="(nav,index) in navs">
                <ul>
                    <li>{{index+1}}</li>
                    <li>{{nav.categoryName}}</li>
                    <li>{{nav.addTime}}</li>
                    <li class="eitCategory">
                        <a @click="deleteCategory(nav._id)">删除</a>
                        <a @click="editCategory(nav._id)">编辑</a>
                    </li>
                </ul>
            </div>
        </div>
        <pager :url="url" @getData="getData" v-if="render"></pager>
        <div class="addCategory">
           <span>新建分类</span>
           <div>
               <span>分类名称:</span>
               <input type="text" v-model="newCategoryName" placeholder="请输入新的分类名称">
               <button @click="addCategory">确定添加分类</button>
               <p v-show="warning">{{addCategoryWarning}}</p>
           </div>
       </div>
        <div class="editCategory" v-show="edit">
           <span>修改分类</span>
           <div>
               <span>分类名称:</span>
               <input type="text" v-model="editCategoryName" placeholder="请输入新的分类名称">
               <button @click="sureEditCategory">确定修改分类</button>
               <p v-show="editwarning">{{editCategoryWarning}}</p>
           </div>
       </div>
  </div>
</template>
<script>
import Pager from "../../components/pager"
import axios from "axios";
export default {
  name: "Category",
  data() {
    return {
        id:'',
      navs: [],
      newCategoryName: "",
      warning: false,
      addCategoryWarning: "",
      edit: false,
      editCategoryName: "",
      editwarning: false,
      editCategoryWarning: "",
     url:"http://localhost:3000/admin/category?page=",
     render:false,
    };
  },
  methods: {
    getData(response){
      this.navs=response.data.category;
    },
    addCategory() {
      if (this.newCategoryName == "") {
        this.warning = true;
        this.addCategoryWarning = "类名不能为空";
        return;
      }
      axios
        .post("http://localhost:3000/admin/category/add", {
          categoryName: this.newCategoryName
        })
        .then(response => {
          if (response.data.code != 0) {
            this.addCategoryWarning = response.data.message;
            this.warning = true;
          } else {
            this.addCategoryWarning = response.data.message;
            this.warning = true;
            axios.get("http://localhost:3000/admin/category").then(
              response => {
                this.count = response.data.count;
                this.limit = response.data.limit;
                this.page = response.data.page;
                this.pages = response.data.pages;
                this.navs = response.data.category;
              },
              response => {
                console.log("error:" + response);
              }
            );
          }
        });
    },
    deleteCategory(id) {
      axios.get("http://localhost:3000/admin/category/delete?id=" + id).then(
        response => {
          axios.get("http://localhost:3000/admin/category").then(
            response => {
              this.count = response.data.count;
              this.limit = response.data.limit;
              this.page = response.data.page;
              this.pages = response.data.pages;
              this.navs = response.data.category;
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
    },
    editCategory(id) {
      axios.get("http://localhost:3000/admin/category/edit?id=" + id).then(
        response => {
          this.edit = true;
          this.id=id;
        },
        response => {
          console.log("error:" + response);
        }
      );
    },
    sureEditCategory() {
      axios.post("http://localhost:3000/admin/category/edit", {
          id: this.id,
          categoryName: this.editCategoryName
        })
        .then(response => {
            this.editCategoryWarning = response.message;
            this.editwarning = true;
            axios.get("http://localhost:3000/admin/category").then(
            response => {
              this.count = response.data.count;
              this.limit = response.data.limit;
              this.page = response.data.page;
              this.pages = response.data.pages;
              this.navs = response.data.category;
            },
            response => {
              console.log("error:" + response);
            }
          );
        });
    }
  },
  components:{
    Pager
  }
};
</script>
<style scoped>
.content {
  width: 70%;
  float: left;
}
ul {
  list-style: none;
}
li {
  display: inline-block;
  width: 24%;
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
.addCategory{

}
</style>
