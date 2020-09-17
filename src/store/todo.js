import axios from "axios";
import { endpoints } from "../api/urls";

import { storeData, getData } from "../utils/localStorage";

const defaultState = {
  todos: [],
};

export default {
  namespaced: true,
  state: defaultState,
  mutations: {
    ADD_TODO(state, todos) {
      state.todos.unshift(todos);
    },
    SET_TODOS(state, todos) {
      state.todos = todos;
    },
    RESET_STATE(state) {
      state.todos = [];
    },
  },
  getters: {
    completeTask(state) {
      return state.todos.filter((item) => item.status);
    },
    inCompleteTask(state) {
      return state.todos.filter((item) => !item.status);
    },
  },
  actions: {
    async addTodo({ dispatch, commit }, task) {
      try {
        let response = await axios.post(endpoints.todos.todos, task);
        if (response.status == 200) {
          dispatch("processTodo", response.data.data);
          let todos = getData("Todos");
          todos.push(response.data.data);
          storeData("Todos", todos);
          commit("SET_TODOS", todos);
          commit(
            "SET_MESSAGE",
            {
              message: response.data.message,
              type: "success",
            },
            {
              root: true,
            }
          );
          return true;
        }
      } catch (error) {
        commit(
          "SET_MESSAGE",
          {
            message: error.response.data.message,
            type: "error",
          },
          {
            root: true,
          }
        );
      }
    },
    async processTodo({ commit }, todo) {
      commit("ADD_TODO", todo);
      //   storeData('todos',todo);
    },
    async fetchTodo({ commit }) {
      try {
        let todos = getData("Todos");
        if (todos && todos.constructor.name == "Array" && todos.length > 0) {
          console.log(todos);
          commit("SET_TODOS", todos);
          storeData("Todos", todos);
          return true;
        }
        let response = await axios.get(endpoints.todos.todos);
        commit("SET_TODOS", response.data.data);
        storeData("Todos", response.data.data);
        return true;
      } catch (error) {
        console.log(error);
        commit(
          "SET_MESSAGE",
          {
            message: error.toString(),
            type: "error",
          },
          {
            root: true,
          }
        );
      }
    },
    async updateTodo({ commit }, updateData) {
      try {
        let response = await axios.patch(endpoints.todos.todos, updateData);
        if (response.status == 200) {
          /* update the set and localstorage */
          const id = response.data.data._id;
          const todos = getData("Todos");
          for (let index = 0; index < todos.length; index++) {
            if (todos[index]._id == id) {
              todos[index] = response.data.data;
            }
          }
          storeData("Todos", todos);
          commit("SET_TODOS", todos);

          /* set the messages */
          commit(
            "SET_MESSAGE",
            {
              message: response.data.message,
              type: "success",
            },
            {
              root: true,
            }
          );
        }
      } catch (error) {
        commit(
          "SET_MESSAGE",
          {
            message: error.response.data.message,
            type: "error",
          },
          {
            root: true,
          }
        );
      }
    },
    async deleteTodo({ commit }, id) {
      try {
        let response = await axios.delete(`${endpoints.todos.todos}/${id}`);
        if (response.status == 200) {
          /* update the set and localstorage */
          const todos = getData("Todos");
          const filterTodos = todos.filter((item) => item._id != id);
          storeData("Todos", filterTodos);
          commit("SET_TODOS", filterTodos);

          /* set the messages */
          commit(
            "SET_MESSAGE",
            {
              message: response.data.message,
              type: "success",
            },
            {
              root: true,
            }
          );
        }
      } catch (error) {
        console.error(error);
        commit(
          "SET_MESSAGE",
          {
            message: error.response.data.message,
            type: "error",
          },
          {
            root: true,
          }
        );
      }
    },
    resetTodoState({commit}){
      commit("RESET_STATE")
    }
  },
};
