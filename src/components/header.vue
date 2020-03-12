<template>
<div class="nac">
	<el-row class="navcontent">
 <el-col :span="6"><el-link type="primary"><router-link to="/manager">管理中心</router-link></el-link>	 </el-col>
  <el-col :span="6"><el-link type="primary"><router-link to="/roomList">管理房间</router-link></el-link> </el-col>
  <el-col :span="6"><el-link type="primary"><router-link to="/foodmanager">商品管理</router-link></el-link></el-col>
  <el-col :span="6" :offset="6"><el-link type="primary"><el-button @click="outlogin">退出登录</el-button></el-link></el-col>
   </el-row>
  
   	<el-button @click="outlogin()">退出登录</el-button>

</div>
</template>
<script>
import axios from 'axios'
  export default {
  	name:"headers",
    data() {
       return {
        login: {
          name: '',
          passwords: '',
        }
      }
    },
    methods: {
       outlogin:function(){
       	sessionStorage.removeItem("userName");
    	 location.reload();       	   
       }
    }
  }
</script>