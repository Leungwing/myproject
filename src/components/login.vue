<template>
	<el-row :gutter="20">
   <el-col :span="8" :offset="8" >
   	 <div class="grid-content bg-purple loginFrom">
   	 	 <h1>登录</h1>
   	 	 <el-form label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="name">
    <el-input v-model="login.name"></el-input>
  </el-form-item>
 <el-form-item label="密码" prop="name">
    <el-input type="password" v-model="login.passwords"></el-input>
  </el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
   
  </el-form-item>
</el-form>
   	 </div>
   </el-col>
</el-row>
</template>
<script>
import axios from 'axios'
  export default {
  	name:"login",
    data() {
       return {
        login: {
          name: '',
          passwords: '',
        }
      }
    },
    methods: {
     submitForm:function(){
     	 axios({
    method:'POST',
    url:"http://www.taobaoadmin.com/public/index/Login/tologin",
    data:{'userName':this.login.name,'password':this.login.passwords},
     transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
    headers:{"Content-Type":"application/json;charset=utf-8"},
    withCredentials : true
}).then(response => {
     console.log(response.data);
      if(response.data==0){ 
    	 sessionStorage.setItem("userName",this.login.name);     
         this.$store.commit('getLoginSession',1);    	 
    	 location.reload();
      }
      else{
      	alert("密码错误");
      }
}).catch(function(err){
       /*请求失败*/
      console.log(err);
})
     	
     }
    }
  }
</script>
<style>
	body{overflow: hidden;}
	.loginFrom{text-align: center; margin-top:15%;}
</style>