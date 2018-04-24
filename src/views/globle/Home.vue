<template>
  <div class="warp">
  <my-header></my-header>
  <div class="content" :style="{minHeight:minHeight+'px'}">
      <router-view></router-view>
      <side-bar></side-bar>
  </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import SideBar from "../../components/home/SideBar";
import ArticleList from "../../components/home/ArticleList";
import MyHeader from "../../components/home/MyHeader.vue";
import MyFooter from "../../components/home/Footer";
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      minHeight: 0
    };
  },
  created() {
    
  },
  mounted() {
    this.minHeight = document.documentElement.clientHeight - 131;
    var that = this;
    window.onresize = function() {
      that.minHeight = document.documentElement.clientHeight - 131;
    };
  },
  components: {
    MyHeader,
    SideBar,
    ArticleList,
    MyFooter
  }
};
</script>
<style scoped>
.content {
display: block;
  margin: auto;
  width: 55%;
  height:100%;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
</style>
