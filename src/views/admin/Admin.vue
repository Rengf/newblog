<template>
  <div class="warp">
      <sider-bar></sider-bar>
      <router-view></router-view>
  </div>
</template>
<script>
import siderBar from '../../components/admin/siderbar'
export default{
    data(){
        return{

        }
    },
    components:{
        siderBar,
    }
}
    
</script>
<style>

</style>
