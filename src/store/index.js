import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 用来存储数据
const state = {
  commentList:'',
};
// 响应组件中的事件
const actions = {};
// 操作数据,只能通过mutations才能够修改数据
const mutations = {
  changeFilmList(state,data){
    state.commentList = data;
    console.log("vuex中的commentList发生改变！");
  }
};
// 用来将state数据进行加工
const getters = {};
// 新建并暴露store
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
