import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import todo from "./todo";
import projects from "./projects";
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
    RESET_STATE(state) {
      state.message = {};
    },
  },
  actions: {
    setMessage({
      commit
    }, message) {
      commit("SET_MESSAGE", message);
    },
    resetGlobalState({
      commit,
      dispatch
    }) {
      commit("RESET_STATE");
      dispatch("auth/resetAuthState", null, {
        root: true
      });
      dispatch("todo/resetTodoState", null, {
        root: true
      });
      dispatch("projects/resetProjects", null, {
        root: true
      });
    },
  },
  modules: {
    auth,
    todo,
    projects
  },
});