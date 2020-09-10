import axios from 'axios';
import {
  endpoints
} from "../api/urls";

import {storeData} from '../utils/localStorage';

export default ({
  namespaced: true,
  state: {
    token: null,
    user: {}
  },
  mutations: {

    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    }

  },
  actions: {
    async login({
      dispatch
    }, credentials) {
      try {
        let response = await axios.post(endpoints.users.login, credentials);
        if (response.status == 200) {
          dispatch('setToken', response.data.token);
          return true;
        }
      } catch (error) {
        console.log(error.response);
      }
    },
    async setToken({
      commit
    }, token) {
      commit("SET_TOKEN", token);
      storeData('token',token);
    }
  }
})