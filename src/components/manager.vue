<template>
<el-row style="width: 80%; margin: 0 auto; margin-top: 30px;">
  <el-col :span="4" v-for="(list,index) in ListData" :key="index" class="borderRoom" :class="[list.state==1? 'busyroom':'canroom']">
  	<div class="roomName">{{list.roomname}}({{list.sizename}})</div>
  	<div class="grid-content bg-purple icon"><i class="el-icon-data-analysis" :class="[list.state==1? 'busy':'can',iconSytle]"></i></div>
  <div v-if="list.state != 0" style="width: 100%;">
   <el-row style="margin-top: 20px; text-align: center;">
   	<!-- 点餐弹框-->
  <el-dialog title="点餐" :visible.sync="click">
  	<el-row>
<el-col :span="12"> 
	 <h1>菜单</h1>
  <el-table :data="foodData">
    <el-table-column property="goodsName" label="货物"></el-table-column>
    <el-table-column property="stock" label="库存"></el-table-column>
    <el-table-column property="price" label="价格"></el-table-column>   
    <el-table-column  fixed="right" label="操作"   width="100" >
      <template slot-scope="scope">
        <el-button @click="cutFood(scope.row.count,scope.$index)"  icon="el-icon-minus" circle size="mini"></el-button>
        <span>{{scope.row.count}}</span>
        <el-button @click="addFood(scope.row.count,scope.$index)"  icon="el-icon-plus" circle  size="mini"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <div><el-button type="primary" plain @click='sendFoodOrder()'>下单</el-button></div>
</el-col>
<el-col :span="12"> 
	 <h1>已点</h1>
  <el-table :data="foodData">
    <el-table-column property="goodsName" label="货物"></el-table-column>
    <el-table-column property="stock" label="库存"></el-table-column>
    <el-table-column property="price" label="价格"></el-table-column>   
    <el-table-column  fixed="right" label="数量"   width="100" >
      <template slot-scope="scope">
        <el-button  icon="el-icon-minus" circle size="mini"></el-button>
      </template>
    </el-table-column>
  </el-table>
</el-col>
  </el-row>  
</el-dialog>
  <el-button type="primary" plain @click='orderFood(list.roomid)'>点餐</el-button>
  <el-button type="success" plain @click='payment(list.roomid,index)'>结账</el-button>
  <div class="clear"></div>
</el-row>
  </div>
  <div style="text-align: center; width: 100%; margin-top: 20px;" v-else>
  <el-button slot="reference"   @click.native='startGame(list.roomid,index)'>开始</el-button>
  <el-button type="primary" plain>预约</el-button>
  <div class="clear"></div>
  </div>
  </el-col>
  <!-- 结算弹框-->
  <el-dialog title="消费提示" :visible.sync="dialogVisible" width="30%">
  <p>开始时间:&nbsp;{{order.startTime}}</p>
  <p>消费时长:&nbsp;{{pay.longtime}}</p>
  <p>单价(/H):&nbsp;{{pay.perPrice}}</p>
  <p>金额:&nbsp;{{pay.price}}</p>
  <el-form label-width="80px">
 <el-form-item label="选择优惠">
   <el-select v-model="pay.youhui" placeholder="请选择" @change="selectyou(pay.dataIndex)">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item label="实收">
    <el-input v-model="pay.totlePrice"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="subPay()">确 定</el-button>
  </span>
</el-dialog>
</el-row>

</template>
<script>
	import axios from 'axios'
  export default {
  	name:"manager",
    data() {
       return {
        ListData:null,
        foodData:null,
        iconSytle:"el-icon-data-analysis",
        dialogVisible:false,
        pay:{
        	  startTime:"",
        	  longtime:"",
        	  price:"",
        	  youhui:"1",
        	  totlePrice:"",
        	  endTime:"",
        	  roomId:"",
        	  dataIndex:"",
        	  perPrice:""
        },
        order:{ roomId:"" },
        options: [
           {value: '1',
            label: '无优惠'}
         ,{
          value: '0.9',
          label: '九折'
        },{
          value: '0.8',
          label: '八折'
        },
         {
          value: '0.5',
          label: '五折'
        }
        ],
        click:false
      }},
       mounted () {
       	  axios
      .get('http://www.taobaoadmin.com/public/index/Index/getRoom')
      .then(response => {this.ListData = response.data[0]; 
             var foodList=response.data[1];
             for(var i=0; i<foodList.length;i++){
             	   foodList[i].count=0;
             }
             this.foodData = foodList;
             console.log(this.foodData);
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
        },
      computed :{
      	totle:function(){
      		 let sum = 0;    		 
           let getdata=this.gridData;
           for(var i=0; i<getdata.length; i++){
           	 sum+= getdata[i].price
           }
           return sum;
      	}
      
    },
    methods: {
        orderFood:function(x){ //点餐
        	 console.log(x);
        	  this.click=true;

        },
       startGame:function(x,i){ //开房
     // get请求
         axios({
	url: 'http://www.taobaoadmin.com/public/index/Index/startGame',
	method: 'get',
	params: {
		roomid: x
	}
}).then(response=>{
	 this.ListData[i].state=1;
	 this.ListData[i].startTime=response.data;
}).catch(function(error) {
	console.log(error)
});
},
        payment:function(x,i){ //结账计算
        	  this.pay.dataIndex=i;
        	   axios({
	url: 'http://www.taobaoadmin.com/public/index/Index/getOrderMessage',
	method: 'get',
	params: {
		roomid: x
	}
}).then(response=>{
	          this.order=response.data;
	          console.log(response.data);
	          this.pay.perPrice=this.ListData[i].price;
            this.pay.startTime=this.order.startTime;
        	  var dateBegin = new Date(this.order.startTime);
        	  var now=gettime();
        	      var day1 = new Date();
                var dateEnd = new Date(now);
                var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
                
                var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
                var leave1 = dateDiff % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
                var hours = Math.floor(leave1 / (3600 * 1000));//计算出小时数
                //计算相差分钟数
                var leave2 = leave1 % (3600 * 1000);   //计算小时数后剩余的毫秒数
                var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
                //计算相差秒数
                var leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
                var seconds = Math.round(leave3 / 1000);
                var  totleSeconds=parseFloat(minutes/60);                   
                     hours=Math.floor(hours);
                var totletime=hours+totleSeconds;
                var showTime=hours+"小时"+minutes+"分钟";
               totletime= Math.round(totletime * 100) / 100

                var totleprice =totletime*this.ListData[i].price;
                this.dialogVisible=true;
                this.pay.longtime=showTime;
                this.pay.startTime=this.ListData[i].startTime;
                this.pay.price=Math.ceil(totleprice);
                this.pay.totlePrice=Math.ceil(totleprice);
                this.pay.roomId=x;
                //日期格式化
               var year =new Date().getFullYear();//获取完整的年份(4位,1970-????)
               var month = new Date().getMonth() + 1;//获取当前月份(0-11,0代表1月)
               var day = new Date().getDate();//获取当前日(1-31)
               var hour= new Date().getHours();
               var min=new Date().getMinutes();
               var sen=new Date().getSeconds();
               let dateString=year+"-"+month+"-"+day+" "+hour+":"+min+":"+sen;
               console.log(dateString);
               this.pay.endTime=dateString;
	    
}).catch(function(error) {
	console.log(error)
});
        },
       subPay(x){  //提交给钱
            let 	price=this.pay.totlePrice;
            let endtime =this.pay.endTime;
            let roomId= this.pay.roomId;
       	    // get请求
  axios({
	url: 'http://www.taobaoadmin.com/public/index/Index/payMent',
	method: 'get',
	params: {
		roomid: roomId,
		price:price,
		endTime:endtime,
	}
}).then(response=>{
	   console.log("成功");
	   this.dialogVisible=false;
	   this.ListData[this.pay.dataIndex].state=0;
}).catch(function(error) {
	console.log(error)
});
    },
       selectyou(){ //选择优惠
       	 var pirce=this.pay.price;
       	 var you=this.pay.youhui;
       	 var endprice=Math.ceil(pirce*you);
       	 console.log(endprice);
       	 this.pay.totlePrice=endprice;
       },
       addFood(x,i){  //添加食物
       	   let newcount=x+1;      	 
       	 this.foodData[i].count=newcount;
       },
       cutFood(x,i){ //减少食物
       	   let newcount=x-1;      	 
       	 this.foodData[i].count=newcount;
       },
       sendFoodOrder(x){ //下单食物
       	   let foodNum=[];
       	   let foodId=[];
       	   let allFood=this.foodData;
       	   console.log(x);
       	   for(let i=0; i<allFood.length; i++){
       	   	  if(allFood[i].count!=0){
       	   	  	foodId.push(allFood[i].gid);
       	   	  	foodNum.push(allFood[i].count);
       	   	  }
       	   }
//     	   let sendFood=JSON.stringify(orderFood);
       	    axios({
    method:'POST',
    url:"http://www.taobaoadmin.com/public/index/Index/orderfood",
    data:{'foodId':foodId,'foodNum':foodNum,"roomId":x},
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
     	alert("添加成功");   	
       this.form.name="";
       this.form.region="";
     }
}).catch(function(err){
       /*请求失败*/
      console.log(err);
})
       }
}
}
function gettime(){
	 var myDate = new Date();
   var year = myDate.getFullYear();
   var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var h = myDate.getHours(); //获取当前小时数(0-23)
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)
    var s = myDate.getSeconds();
 var now = year + '-' + conver(month) + "-" + conver(date) + " " + conver(h) + ':' + conver(m) + ":" + conver(s);
   function conver(s) {
return s < 10 ? '0' + s : s;
}
    return now;
}
</script>
<style>
	.icon i{font-size: 50px; color: #f00;}
	.roomName{color:#409EFF;font-size: 20px; text-align: center;}
	.icon{text-align: center; margin: 10px;}
	.icon .busy{color: #909399;}
	.icon .can{color:green;}
	.icon .free{color:#67C23A;}
	.time{margin: 0 15px; text-align: center;}
	.clear{clear: both;}
	.borderRoom{padding: 15px 0; margin-top: 25px; margin-left: 15px;}
	.busyroom{background: #D3DCE6;}
	.canroom{background: #67C23A;}
</style>