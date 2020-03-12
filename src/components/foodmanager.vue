<template>
 <el-row style="width: 100%;">
  <el-col :span="11"><div class="grid-content bg-purple">
  	 <h2>商品列表</h2>
  	<el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="goodsName"
      label="商品"
      width="120">
    </el-table-column>
    <el-table-column
      property="price"
      label="价钱"
      width="120">
    </el-table-column>
    <el-table-column
      property="stock"
      label="库存">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
     <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
      </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="setCurrent(tableData[1])">选中第二行</el-button>
    <el-button @click="dialogVisible = true">添加商品</el-button>
  </div>
  </div></el-col>
  <el-col>	
  	<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%">
  <el-form :model="form">
    <el-form-item label="商品名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品价格" :label-width="formLabelWidth">
      <el-input v-model="form.price" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="库存" :label-width="formLabelWidth">
      <el-input v-model="form.stock" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addFood();">确 定</el-button>
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
        tableData:null,
        currentRow: null,
         dialogVisible: false,
         handleClose:false,
          form: {
          name: '',
          price: '',
          stock: '',
        },
        formLabelWidth: '120px'
      }
    },
 mounted () {
       	  axios
      .get('http://www.taobaoadmin.com/public/index/Index/getFood')
      .then(response => {this.tableData = response.data;console.log(response.data)})
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
        },
    methods: {
      setCurrent(row) {
//      this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      addFood(){
      	 axios({
    method:'POST',
    url:"http://www.taobaoadmin.com/public/index/Index/addFood",
    data:{'foodname':this.form.name,'foodprice':this.form.price,"foodstock":this.form.stock},
     transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
    headers:{'Content-Type': "application/x-www-form-urlencoded"}
}).then(response => {
     if(response.data==1){
     	let newFood=new Object();
     	newFood.goodsName=this.form.name;
     	newFood.price=this.form.price;
     	newFood.stock=this.form.stock;
     	this.tableData.push(newFood);
     	alert("添加成功");   	     	
       this.form.name="";
       this.form.price="";
       this.form.stock="";
       this.dialogVisible=false;
     }
}).catch(function(err){
       /*请求失败*/
      console.log(err);
})
      	
      }
    }
  }
</script>