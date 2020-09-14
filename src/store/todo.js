import axios from 'axios';
import {
  endpoints
} from "../api/urls";

import {storeData} from '../utils/localStorage';

export default ({
  namespaced: true,
  state: {
    todos: [],
  },
  mutations: {

    ADD_TODO(state, todos) {
      state.todos.push(todos);
    },
    SET_TODOS(state , todos){
      state.todos.push(todos);
    }

  },
  getters : {
    getTodos(state){
        return state.todos;
    }
  },
  actions: {
    async addTodo({
      dispatch
    }, task) {
      try {
        let response = await axios.post(endpoints.todos.todos, task);
        if (response.status == 200) {
          
          dispatch('processTodo', response.data.data);
          return true;
        }
      } catch (error) {
        console.log(error.response);
      }
    },
    async processTodo({
      commit
    }, todo) {
      commit("ADD_TODO", todo);
    //   storeData('todos',todo);
    },
    async fetchTodo({commit}){
      let response = await axios.get(endpoints.todos.todos);
      commit("SET_TODOS" , response.data.data);
      storeData("Todos",response.data);
      return response.data.data;
    }
  }
})