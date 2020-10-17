import axios from "axios";
import { endpoints } from "../api/urls";

import { storeData, getData } from "../utils/localStorage";

const defaultState = {
  todos: [],
  isLoading: {
    state: false,
    type: "",
  },
  modalState: {
    isActive: false,
    type: "",
    data: {},
  },
};

export default {
  namespaced: true,
  state: defaultState,
  mutations: {
    ADD_TODO(state, todos) {
      state.todos.push(todos);
      storeData("Todos", state.todos);
    },
    SET_TODOS(state, todos) {
      state.todos = todos;
      storeData("Todos", todos);
    },
    SET_MODAL_STATE(state, modalStateObj) {
      state.modalState = modalStateObj;
    },
    SET_LOADING_STATE(state, currentState) {
      state.isLoading = currentState;
    },
    RESET_STATE(state) {
      state.todos = [];
      state.isLoading = {
        state: false,
        type: "",
      };
      state.modalState = {
        isActive: false,
        type: "",
        data: {},
      };
    },
  },
  getters: {
    getTodos(state) {
      if (getData("Todos")) {
        state.todos = getData("Todos");
      }
      return state.todos;
    },
    getLoadingState(state) {
      return state.isLoading;
    },
    getModalState(state) {
      return state.modalState;
    },
  },
  actions: {
    /* TODO Methods */
    async fetchTodo({ dispatch, getters, commit }) {
      try {
        const todos = getters.getTodos;
        if (todos && todos.constructor.name == "Array" && todos.length > 0) {
          return todos;
        }
        const { status, data } = await axios.get(endpoints.todos.todos);
        if (status == 200) {
          commit("SET_TODOS", data.data);
          return true;
        }
      } catch (error) {
        dispatch(
          "setMessage",
          {
            message: error.toString(),
            type: "error",
          },
          { root: true }
        );
        return false;
      }
    },
    async addTodo({ dispatch, commit }, task) {
      try {
        let { status, data } = await axios.post(endpoints.todos.todos, task);
        if (status == 200) {
          commit("ADD_TODO", data.data);
          dispatch(
            "setMessage",
            {
              message: data.message,
              type: "success",
            },
            { root: true }
          );
          return true;
        }
      } catch (error) {
        dispatch(
          "setMessage",
          {
            message: error.toString(),
            type: "error",
          },
          { root: true }
        );
        return false;
      }
    },
    async deleteTodo({ dispatch, commit }, id) {
      try {
        const { status, data } = await axios.delete(
          `${endpoints.todos.todos}/${id}`
        );
        if (status == 200) {
          /* update the set and localstorage */
          const todos = getData("Todos");
          const filterTodos = todos.filter((item) => item._id != id);
          commit("SET_TODOS", filterTodos);

          /* set the messages */
          dispatch(
            "setMessage",
            {
              message: data.message,
              type: "success",
            },
            { root: true }
          );

          return true;
        }
      } catch (error) {
        dispatch(
          "setMessage",
          {
            message: error.toString,
            type: "error",
          },
          { root: true }
        );
        return false;
      }
    },
    async updateTodo({ dispatch, commit }, updateData) {
      try {
        const { status, data } = await axios.patch(
          endpoints.todos.todos,
          updateData
        );
        if (status == 200) {
          /* update the set and localstorage */
          const id = data.data._id;
          const todos = getData("Todos");
          for (let index = 0; index < todos.length; index++) {
            if (todos[index]._id == id) {
              todos[index] = data.data;
            }
          }
          commit("SET_TODOS", todos);

          /* set the messages */
          dispatch(
            "setMessage",
            {
              message: data.message,
              type: "success",
            },
            { root: true }
          );
          return true;
        }
      } catch (error) {
        dispatch(
          "setMessage",
          {
            message: error.toString(),
            type: "error",
          },
          { root: true }
        );
        return false;
      }
    },
    async processTodo({ commit }, todo) {
      commit("ADD_TODO", todo);
      //   storeData('todos',todo);
    },
    /* Helpers */
    resetTodoState({ commit }) {
      commit("RESET_STATE");
    },
    updateTodoState({ commit }, todos) {
      commit("SET_TODOS", todos);
    },
    setLoadingState({ commit }, state) {
      commit("SET_LOADING_STATE", state);
    },
    setModalState({ commit }, object) {
      commit("SET_MODAL_STATE", object);
    },
  },
};
