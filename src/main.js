// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import App from './App'	
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/style.css'
import axios from 'axios'
import store from './vuex/store' 
import qs from 'qs';
Vue.prototype.$qs = qs;

Vue.prototype.$ajax = axios;
axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;

Vue.use(ElementUI);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
let username = sessionStorage.getItem("userName");
if(username==null){
if(to.path=="/login"){next();}
else{next("/login"); } 	 
}
else{
	if(from.path=="/"){
if(to.path=="/manager"){next();}
else{next("/manager"); }	   
}
	else{
		next();
	}
//next(to.path);
store.commit('getLoginSession',1);    	 
}
});
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
