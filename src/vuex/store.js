import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    roomList:[], //房间列表
    roomSize:[],//房间大小列表
    session:0,//是否登录
};
const mutations = {
    changeRoomList(state,n) {
        return (state.roomList = n) //改变方便房间列表的值
    },
    changeRoomSize(state, n) {
        return (state.roomSize = n)  //改变房间大小的值
    },
     getLoginSession(state, n) {
     	 console.log(n);
        return (state.session = n)  //改变房间大小的值
    }
};
const getters= {
    getRoomSize: state => {
      return state.roomSize;
    },
     getRoom: state => {
      return state.roomList;
    },getLoginSession: state => {
      return state.session;
    },
  }

export default new Vuex.Store({
    state,
    mutations,
    getters
})