<template>
  <div class="warp">
  <my-header></my-header>
  <div class="content">
      <router-view></router-view>
      <side-bar></side-bar>
  </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import SideBar from '../../components/home/SideBar'
import ArticleList from '../../components/home/ArticleList'
import MyHeader from '../../components/home/MyHeader.vue'
import MyFooter from '../../components/home/Footer'
import axios from 'axios'
    export default{
        name:'Home',
        created(){
            axios.get("http://localhost:3000").then(
                response=>{
                    alert(response.data.userInfo.username)
                },
                response=>{
                    console.log("error:"+response)
                }
            )
        },
        components:{
            MyHeader,
            SideBar,
            ArticleList,
            MyFooter
        }
    }
</script>
<style scoped>
.content{
    position: relative;
    margin: auto;
    width:55%;
    border-right:1px solid #ccc;
    border-left:1px solid #ccc;
}
</style>
