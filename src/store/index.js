import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import todo from './todo'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message : {}
  },
  mutations: {
    SET_MESSAGE(state,message){
      state.message =  message
    }
  },
  actions: {
  },
  modules: {
    auth,
    todo
  }
})
