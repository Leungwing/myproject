<template>
 <el-row style="width: 100%;">
  <el-col :span="11"><div class="grid-content bg-purple">
  	 <h2>房间列表</h2>
  	<el-table ref="singleTable" :data="$store.state.roomList" highlight-current-row  @current-change="handleCurrentChange" style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="roomname"
      label="房间名称"
      width="120">
    </el-table-column>
    <el-table-column  property="sizename" label="房间类型"   width="120">
    </el-table-column>
    <el-table-column property="state"  label="房间状态" >
    	<template slot-scope="scopes">
          <el-tag v-if="scopes.row.state == 0" type="info"> 空闲 </el-tag>
          <el-tag v-else type="danger">有人</el-tag>
      </template>
    </el-table-column>
    <el-table-column   property="price"    label="价钱">
   </el-table-column>
    <el-table-column fixed="right" label="操作"     width="100">
      <template slot-scope="scope">
        <el-button  type="text" size="small">删除</el-button>
        <el-button  @click="editRoom(scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="editRoom(0)">添加房间</el-button>
  </div>
  </div></el-col>
  <el-col :span="2"></el-col>
  <el-col :span="11" style="float: right;"><div class="grid-content bg-purple-light">
  	 <h2>房型列表</h2>
  	<el-table
    ref="singleTable"
    :data="$store.state.roomSize"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="sizename"
      label="类型"
      width="120">
    </el-table-column>
    <el-table-column
      property="price"
      label="价钱"
      width="120">
    </el-table-column>
    <el-table-column label="操作" width="100" type="index"> 
      <template slot-scope="scope">
      	<el-button  type="text" size="small"  @click="deleteRoomSize(scope.row,scope.$index)" >删除</el-button>
        <el-button  @click="editPrice(scope.row,scope.$index)" type="text" size="small" >编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="editPrice(0)">添加房间类型</el-button>
  </div>
  </div>
  </div></el-col>
  
  <el-col>
  	<!--  修改房间价格 -->
<el-dialog title="房间类型管理" :visible.sync="changePrice">
  <el-form :model="form">
     <el-form-item label="房间类型" :label-width="formLabelWidth">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="价钱" :label-width="formLabelWidth">
       <el-input v-model="form.price"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="changePrice = false">取 消</el-button>
    <el-button type="primary" @click="changeRoomSize(form.id);">确 定</el-button>
  </div>
</el-dialog>
  </el-col>
    <el-col>
  	<!--  修改房间 -->
<el-dialog title="房间管理" :visible.sync="changeRoom">
  <el-form :model="room">
     <el-form-item label="房间类型" :label-width="formLabelWidth">
    <el-input v-model="room.name"></el-input>
  </el-form-item>
    <el-form-item label="价钱" :label-width="formLabelWidth">
  <el-select v-model="room.size" placeholder="请选择">
    <el-option
      v-for="item in this.roomSize"
      :key="item.sizeid"
      :label="item.sizename"
      :value="item.sizeid">
    </el-option>
  </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="changeRoom = false">取 消</el-button>
    <el-button type="primary" @click="changeRoomName(room.id);">确 定</el-button>
  </div>
</el-dialog>
  </el-col>
</el-row>
</template>
<script>
	import axios from 'axios'
  export default {
    data() {
      return {
        roomSize:null,
        roomList:null,
        currentRow: null,
        changePrice:false,
        changeRoom:false,
        form:{
        	name:"",
        	price:"",
        	id:"",
        	index:""
        },
        room:{
        	size:"",
        	name:"",
        	roomid:""
        },
        formLabelWidth: '120px'
      }
      
    },
    mounted () {
    	function getUserAccount() {
  return axios.get('http://www.taobaoadmin.com/public/index/Index/getRoom');
}
 
function getUserPermissions() {
  return axios.get('http://www.taobaoadmin.com/public/index/Index/getRoomSize');
}
axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread((res1,res2)=>{
   this.$store.commit('changeRoomList',res1.data[0]);
   this.$store.commit('changeRoomSize',res2.data); 
      }));
  },
    methods: {
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      addRoom(){
      	let roomSize=this.$store.getters.getRoomSize;
      	console.log(roomSize);
      	 
      },
      editPrice(row,i){ //打开修改价格弹框
      	  this.changePrice=true;
      	  if(row==0){ //添加
      	  this.form.name="";
      	  this.form.price="";
      	  this.form.id="";
      	  this.form.index=-1;
      	  }
      	  else{ //修改
      	  this.form.name=row.sizename;
      	  this.form.price=row.price;
      	  this.form.id=row.id;
      	  this.form.index=i;
      	  }
      },
      changeRoomSize(id){ //提交修改价格
      	  axios({
    method:'POST',
    url:"http://www.taobaoadmin.com/public/index/Change/changeRoomSize",
    data:{'id':id,'sizeName':this.form.name,"price":this.form.price,"type":this.form.index},
     transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret;
        }],
    headers:{'Content-Type': "application/x-www-form-urlencoded"}
}).then(response => {
     if(response.data!=-1){
     	if(this.form.index==-1){  //添加房间类型
     	this.$message({  message: '添加成功',type: 'success'});    		
     	this.changePrice=false;   
     	let roomSize=this.$store.getters.getRoomSize;    	
     	  let newSize=new Object();
     	  newSize.sizeid=response.data;
     	  newSize.sizename= this.form.name;
      	 newSize.price=this.form.price;
      	 roomSize.push(newSize);
      	 this.$store.commit('changeRoomSize',roomSize); 
     	}
     	else{ //修改房间类型
     	this.$message({  message: '修改成功',type: 'success'});
     	let i=this.form.index;
     	let roomSize=this.$store.getters.getRoomSize;
      	 roomSize[i].sizename= this.form.name;
      	 roomSize[i].price=this.form.price;
       this.$store.commit('changeRoomSize',roomSize); 
       this.form.name="";
       this.form.price="";
       this.changePrice=false;     
      }
     }
     else{ this.$message.error('修改失败');}
}).catch(function(err){
       /*请求失败*/
      console.log(err);
})
     },
     deleteRoomSize(id,i){ //删除房间类型     	    	
     	axios({
    method:'POST',
    url:"http://www.taobaoadmin.com/public/index/Change/deleteRoomSize",
    data:{'id':id.sizeid},
     transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret;
        }],
    headers:{'Content-Type': "application/x-www-form-urlencoded"}
}).then(response => {
     if(response.data==1){
     	 console.log(i);
     	let roomSize=this.$store.getters.getRoomSize;
     	roomSize.splice(i,1);
     	this.$message({  message: '删除成功',type: 'success'});
        this.form.names="";
        this.form.price="";
     }
     else{alert("删除失败"); }
}).catch(function(err){
       /*请求失败*/
      console.log(err);
})
    },
    editRoom:function(x){  //修改房间
    	 this.changeRoom=true;
    	 this.roomSize=this.$store.getters.getRoomSize;    	
  	     this.room.size=x.sizeid;
  	     this.room.name=x.roomname;
  	     this.room.id=x.id;
    },
    changeRoomName:function(x){
    	 this.changeRoom=false;
    	axios({
    method:'POST',
    url:"http://www.taobaoadmin.com/public/index/Change/changeRoom",
    data:{'id':this.room.id,'roomName':this.room.name,'roomSize':this.room.size},
     transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret;
        }],
    headers:{'Content-Type': "application/x-www-form-urlencoded"}
}).then(response => {
     if(response.data==1){
     	 console.log(i);
     	let roomList=this.$store.getters.getRoom;
     	roomList.splice(i,1);
     	this.$message({  message: '删除成功',type: 'success'});
       this.form.names="";
       this.form.price="";
     }
     else{alert("删除失败"); }
}).catch(function(err){
       /*请求失败*/
      console.log(err);
})
    }
    }
  }
</script>