import Vue from "vue";
import Router from "vue-router";
import Login from "../pages/Login.vue";
import Home from "../pages/Home.vue";
import Test from "../components/Test.vue";
import FilmDetail from "../pages/FilmDetail.vue"
import Comment from "../components/Comment.vue"
import Down from "../components/Down"
import FilmComment from "../pages/FilmComment.vue"
import Manage from "../pages/Manage.vue"
import Rating from "../pages/Rating.vue"
import AdminLogin from "../pages/AdminLogin.vue"
import Admin from "../pages/Admin.vue"
import Screening from "../pages/Screening.vue"
// import axios from "axios"
Vue.use(Router);

// 定义一些路由
// 每个路由都需要映射到一个组件。
// meta中的requireAuth用于判断是否需要鉴权，如果需要鉴权，则用户在发送请求的时候必须登录
const routes = [
  { path: "/", name : "Start", redirect: "/home" },
  { path: "/login", name: "Login", component: Login,meta:{requireAuth:false}},
  { path: "/home", name: "Home", component: Home ,meta:{requireAuth:false}},
  { path: "/test", name: "Test", component: Test ,meta:{requireAuth:false}},
  { path: "/detail", name: "FilmDetail",component: FilmDetail ,meta:{requireAuth:false}},
  { path: "/comment", name: "Comment", component: Comment ,meta:{requireAuth:false}},
  { path: "/down", name: "Down", component:Down ,meta:{requireAuth:false}},
  { path: "/filmComment", name: "FilmComment", component:FilmComment ,meta:{requireAuth:false}},
  { path: "/manage", name: "Manage", component:Manage ,meta:{requireAuth:false}},
  { path: "/rating", name: "Rating", component:Rating ,meta:{requireAuth:false}},
  { path: "/adminLogin", name: "AdminLogin", component:AdminLogin ,meta:{requireAuth:false}},
  { path: "/admin", name: "Admin", component:Admin ,meta:{requireAuth:false}},
  { path: "/screening", name: "Screening", component:Screening ,meta:{requireAuth:false}},
];

const router = new Router({
  routes
});




//将创建的router对象导出,在main.js使用
export default router;
