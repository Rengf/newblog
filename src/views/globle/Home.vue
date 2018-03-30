<template>
  <div class="warp">
  <my-header></my-header>
  <div class="content">
      <router-view></router-view>
      <side-bar></side-bar>
  </div>
  </div>
</template>
<script>
import SideBar from '../../components/home/SideBar'
import ArticleList from '../../components/home/ArticleList'
import MyHeader from '../../components/home/MyHeader.vue'
    export default{
        name:'Home',
        components:{
            MyHeader,
            SideBar,
            ArticleList
        }
    }
</script>
<style scoped>
.content{
    margin: auto;
    width:55%;
    border-right:1px solid #ccc;
    border-left:1px solid #ccc;
}
</style>
