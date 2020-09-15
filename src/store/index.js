import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import todo from "./todo";
Vue.use(Vuex);

const defaultState = {
  message: {},
};

export default new Vuex.Store({
  state: defaultState,
  mutations: {
    SET_MESSAGE(state, message) {
      state.message = message;
    },
    RESET_STATE(state,defaultState) {
      state = defaultState;
    },
  },
  actions: {
    resetGlobalState({ commit,dispatch }) {
      commit("RESET_STATE",defaultState);
      dispatch("auth/resetAuthState",null , {root : true});
      dispatch("todo/resetTodoState",null,{root : true});
    },
  },
  modules: {
    auth,
    todo,
  },
});
