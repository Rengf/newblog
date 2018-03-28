<template>
  <div class="siderBar">
      <h3 class="category">文章分类</h3>
      <ul class="nav">
          <li v-for="(category,index) in categories" class="categoryList">
              <i></i>
              <router-link :to="{path:'/category',query:{id:category._id}}">{{category.categoryName}}</router-link>
          </li>
      </ul>
  </div>
</template>
<script>
import axios from 'axios'
    export default{
        name:'SideBar',
        data(){
            return{
                categories:[],
            }
        },
        created(){
            axios.get("http://localhost:3000/category").then(response=>{
               this.count = response.data.count;
              this.limit = response.data.limit;
              this.page = response.data.page;
              this.pages = response.data.pages;
              this.categories = response.data.category;
            },response=>{
                console.log('error:'+response);
            })
        }
    }
</script>
<style scoped>
.siderBar{
    width: 30%;
    float: right;
    border-left:1px solid #888 
}
.category{
    font-size: 18px;
    line-height: 40px;
    height: 40px;
    color: #aaa;
    font-weight: bold;
    text-align: center;
    border-bottom: 2px solid #aaa
}
.nav{
    width: 100%;
    list-style: none;
}
.categoryList{
    overflow: hidden;
    clear: both;
    height: 30PX;
    border-bottom: 1px solid #aaa;
}
.categoryList a{
    display: block;
    height: 30px;
    line-height: 30px;
    color:#ccc;
    text-align: center;
}
.categoryList a:hover{
    background: #ccc;
    color:#777
}
</style>
