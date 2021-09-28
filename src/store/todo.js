import axios from "axios";
import {
  endpoints
} from "../api/urls";

import {
  storeData,
  getData
} from "../utils/localStorage";

import {
  loadingStateTypes
} from '../api/types';

const defaultState = {
  todos: [],
  filterTodos : [],
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
    SET_FILTER_TODOS(state, todos) {
      state.filterTodos = todos;
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
    getFilterTodos(state) {
      return state.filterTodos ?? [];
    },
    getLoadingState(state) {
      return state.isLoading;
    },
    getModalState(state) {
      return state.modalState;
    }
  },
  actions: {
    /* TODO Methods */
    async fetchTodo({
      getters,
      commit
    }) {
      try {

        console.log("fetch...");
        commit("SET_LOADING_STATE", {
          type: loadingStateTypes.FETCH_TODO,
          state: true
        });

        const todos = getters.getTodos;
        if (todos && todos.constructor.name == "Array" && todos.length > 0) {
          commit("SET_LOADING_STATE", {
            type: "",
            state: false
          });
          return todos;
        }
        const {
          status,
          data
        } = await axios.get(endpoints.todos.todos);
        if (status == 200) {
          commit("SET_TODOS", data.data);

          commit("SET_LOADING_STATE", {
            type: "",
            state: false
          });

          return true;
        }
      } catch (error) {

        commit("SET_LOADING_STATE", {
          type: "",
          state: false
        });

        commit(
          "SET_MESSAGE", {
            message: error.message,
            type: "error",
          }, {
            root: true,
          }
        );
      }
    },
    async addTodo({
      commit
    }, task) {
      try {
        console.log(loadingStateTypes.ADD_TODO);
        commit("SET_LOADING_STATE", {
          type: loadingStateTypes.ADD_TODO,
          state: true
        });

        let {
          status,
          data
        } = await axios.post(endpoints.todos.todos, task);
        if (status == 200) {
          commit("ADD_TODO", data.data);
          commit(
            "SET_MESSAGE", {
              message: data.message,
              type: "success",
            }, {
              root: true,
            }
          );

          commit("SET_LOADING_STATE", {
            type: "",
            state: false
          });

          return true;
        }
      } catch (error) {

        commit("SET_LOADING_STATE", {
            type: "",
            state: false
          });

        commit(
          "SET_MESSAGE", {
            message: error.message,
            type: "error",
          }, {
            root: true,
          }
        );
      }
    },
    async deleteTodo({
      commit
    }, id) {
      try {
        commit("SET_LOADING_STATE", {
          type: loadingStateTypes.DELETE_TODO,
          state: true
        });
        const {
          status,
          data
        } = await axios.delete(
          `${endpoints.todos.todos}/${id}`
        );
        if (status == 200) {
          /* update the set and localstorage */
          const todos = getData("Todos");
          const filterTodos = todos.filter((item) => item._id != id);
          commit("SET_TODOS", filterTodos);

          /* set the messages */
          commit(
            "SET_MESSAGE", {
              message: data.message,
              type: "success",
            }, {
              root: true,
            });

            commit("SET_LOADING_STATE", {
              type: "",
              state: false
            });
          return true;
        }
      } catch (error) {
        commit("SET_LOADING_STATE", {
          type: "",
          state: false
        });
        commit(
          "SET_MESSAGE", {
            message: error.message,
            type: "error",
          }, {
            root: true,
          }
        );
      }
    },
    async updateTodo({
      commit
    }, updateData) {
      try {
        commit("SET_LOADING_STATE", {
          type: loadingStateTypes.UPDATE_TODO,
          state: true
        });
        const {
          status,
          data
        } = await axios.patch(
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
          commit(
            "SET_MESSAGE", {
              message: data.message,
              type: "success",
            }, {
              root: true,
            }
          );
          commit("SET_LOADING_STATE", {
            type: "",
            state: false
          });
          return true;
        }
      } catch (error) {
        commit("SET_LOADING_STATE", {
          type: "",
          state: false
        });
        commit(
          "SET_MESSAGE", {
            message: error.message,
            type: "error",
          }, {
            root: true,
          }
        );
      }
    },
    async processTodo({
      commit
    }, todo) {
      commit("ADD_TODO", todo);
      //   storeData('todos',todo);
    },
    /* Helpers */
    resetTodoState({
      commit
    }) {
      commit("RESET_STATE");
    },
    updateTodoState({
      commit
    }, todos) {
      commit("SET_TODOS", todos);
    },
    setModalState({
      commit
    }, object) {
      commit("SET_MODAL_STATE", object);
    },
  },
};