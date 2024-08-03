import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import ElementUI from "element-ui";
import store from "./store/index";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:8081";
Vue.prototype.$axios = axios;
const AUTH_TOKEN = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  //401自定义为token失效
  // if(response.data.statusCode == '401'){
  //   //token失效则只需要清空localStorage，对于token的判断交给router
  //   alert("未登录！")
  // }
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  
  // if(error.response.status == 401){
  //   alert("未登录！请重新登陆！")
  //   router.push("/login")
  //   // return error;
  // }
  return Promise.reject(error);
});


new Vue({
  //全局使用
  render: (h) => h(App), //render函数中，渲染的是那个.vue组件，那么这个组件就是根组件
  router,
  axios,
  store
}).$mount("#app");
