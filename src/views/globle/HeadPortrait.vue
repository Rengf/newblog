<template>
  <div class="warp">
      <input type="file" value='' @change="getFile">
      <p class="tip">请选择要上传的文件...</p>
      <button @click="onUpload">上传</button>
      <p class="message" v-show="warn">{{tips}}</p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "HeadPortrait",
  data() {
    return {
        files:'',
        id:'',
        warn:'',
        tips:'',
    };
  },
  created(){
      axios.get("/main/log").then(
            response => {
                if (JSON.stringify(response.data.userInfo) == "{}"||String(response.data.userInfo)=="undefined") {
                    this.showLogin = true;
                }
                else{
                    this.id = response.data.userInfo._id;
                }
            },
            response => {
                console.log("error:" + response);
            }
        );
  },
  methods: {
    getFile(e) {
      this.files = e.target.files[0];
    },
    onUpload() {
      if (this.files) {
        var imgreg = /.+((\.jpg$)|(\.png$))/gi;
        if (imgreg.test(this.files.name)) {
            var formData=new FormData();
            formData.append('myFile',this.files);
            formData.append('id',this.id);
          axios.post("/api/user/edit", formData,{
                headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
            }).then(response => {
                this.warn=true;
              this.tips=response.data.message;
              this.$router.push('/')
            },
            response=>{
                console.log("error:"+response)
            });
        }
      }
    }
  }
};
</script>
<style scoped>

</style>
