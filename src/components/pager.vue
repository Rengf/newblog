<template>
        <div class="pager" v-show="pages>1">
            <div class="prev">
                <span @click="prev" v-if="page>1">上一页</span>
                <span @click="prev" v-else>上一页</span>
            </div>
            <div>
                <span>一共有 {{count}} 条,  {{page}} / {{pages}} 页</span>
            </div>
            <div class="next">
                <span @click="next" v-if="page<pages">下一页</span>
                <span @click="next" v-else>下一页</span>
            </div>
        </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "pager",
  props:{
      url:{
          type:String,
          required:true
      }
  },
  data() {
    return {
      count: 0,
      limit: 0,
      pages: 0,
      page: 1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
        axios.get(this.url+this.page).then(response=>{
         this.count = response.data.count;
          this.limit = response.data.limit;
          this.page = response.data.page;
          this.pages = response.data.pages;
          this.$emit("getData", response);
        },
        response=>{
            console.log("error:"+response)
        })
    },
    prev() {
      this.page = this.page - 1;
      if (this.page < 1) {
        this.page = 1;
        return;
      }
      this.getData(this.page, this.url);
    },
    next() {
      this.page = this.page + 1;
      if (this.page > this.pages) {
        this.page = this.pages;
        return;
      }
      this.getData(this.page, this.url);
    }
  }
};
</script>

<style>
.pager{
  width:80%;
  height: 50px;
  margin: auto;
  display:flex;
  flex-flow: row; 
}
.prev,
.count,
.next{
  width: 30%;
  height: 25px;
  float: left;
  margin: 0 10px;
  line-height: 25px;
  text-align: center
}
.prev span:hover,
.next span:hover{
  cursor: pointer;
  background: #ccc;
}
</style>