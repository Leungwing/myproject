import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/header'
import roomList from '@/components/roomList' //房间列表
import manager from '@/components/manager' //管理中心
import foodmanager from '@/components/foodmanager' //商品管理
import login from '@/components/login' //商品管理
Vue.use(Router)
const User = {
  template: '<div>User</div>'
}

export default new Router({
  routes: [
  {  path:"/content",
components: {
   login: login,
   header: header,
   manager:manager,
   default: manager
}
  },
   {
      path: '/manager',
      name: 'manager',
      component: manager
   },
   {
      path: '/header',
      name: 'header',
      component: header
   },
   {
      path: '/roomList',
      name: 'roomList',
      component: roomList
   },
   {
      path: '/foodmanager',
      name: 'foodmanager',
      component: foodmanager
   },
   {
      path: '/login',
      name: 'login',
      component: login
   }
  ]
})
