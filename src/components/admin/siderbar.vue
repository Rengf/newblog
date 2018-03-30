<template>
  <div class="siderBar">
          <ul>
              <li v-for="nav in navs"><router-link :to="{path:nav.href}">{{nav.name}}</router-link></li>
          </ul>
  </div>
</template>
<script>
    export default{
        name:'siderBar',
        data(){
            return{
                navs:[{href:'/Admin',name:'后台首页'},
                {href:'/User',name:'用户管理'},
                {href:'/Categories',name:'分类管理'},
                {href:'/ArticleManagement',name:'文章管理'},
                {href:'/Publish',name:'文章发布'},
                {href:'/',name:'退出后台'},
                ],
            }
        }
    }
</script>
<style scoped>
.siderBar{
    width:10%;
    height: 100%;
    border-right: 1px solid #ccc;
    float: left;
}
ul{
    height: 100%;
}
li{
    width:100%;
    height: 50px;
    display: inline-block;
    border-bottom: 1px solid #ccc;
}
a{
    display: block;
    width: 100%;
    height: 100%;
    line-height: 50px;
    color: #888;
    text-align: center;
}
a:hover{
    background: #ccc;
}
</style>
