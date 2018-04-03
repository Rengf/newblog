<template>
  <div class="warp">
      <sider-bar></sider-bar>
      <router-view></router-view>
  </div>
</template>
<script>
import axios from 'axios'
import siderBar from '../../components/admin/siderbar'
export default{
    data(){
        return{
            message:'',
        }
    },
    created(){
        axios.get("http://localhost:3000/admin").then(response=>{
            this.message=response.data.message;
        },
        response=>{
            console.log("error:"+response)
        })
    },
    components:{
        siderBar,
    }
}
    
</script>
<style scoped>
.warp{
    position: relative;
}
</style>
