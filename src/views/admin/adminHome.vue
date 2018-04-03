<template>
  <div class="content">{{message}}</div>
</template>
<script>
import axios from 'axios'
export default{
    name:'adminHome',
    data(){
        return{
            message:''
        }
    },
}
    
</script>
<style scoped>
.content{
    width: 89%;
    float: left;
    text-align: center;
    line-height: 300px;
}
</style>
