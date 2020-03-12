<template>
<div class="nav">
<div class="nac" v-if="$store.state.session">
	<el-row class="navcontent">
  <el-col :span="6"> <el-link type="primary"><router-link to="/manager">管理中心</router-link></el-link>	 </el-col>
  <el-col :span="6"><el-link type="primary"><router-link to="/roomList">管理房间</router-link></el-link> </el-col>
  <el-col :span="6"><el-link type="primary"><router-link to="/foodmanager">商品管理</router-link></el-link></el-col>
   </el-row>
  <el-row class="loginout"> <el-col :span="6"><el-link type="primary"><el-button @click="outlogin">退出登录</el-button></el-link></el-col>
   </el-row>
  
</div>
  <div style="clear: both;"><router-view></router-view></div>
   </div>
</template>
<script>
	import axios from 'axios'
    export default {
    	name:"App",
    data() {
      return {
        activeIndex: '1',
        userId:"",
        handleSelect:"",
      }
      },
    methods: {
       outlogin:function(){
       sessionStorage.removeItem("userName");	
       location.reload();       	   
       }
    },
  }
</script>
 <style>
  	body{margin: 0;}
  	.clear{clear: both;}
  	.nac{background: #99A9BF; width: 100%; height: 50px; line-height: 50px;}
  	.nac a{color: #fff; font-size:16px; }.navcontent{width: 30%; margin-left: 5%; float: left;}
  	.loginout{float: right; margin-right: 25px;}
  </style>