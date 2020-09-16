import axios from "axios";
import { endpoints } from "../api/urls";

import { storeData, getData } from "../utils/localStorage";

const defaultState = {
  token: null,
  user: {},
};

export default {
  namespaced: true,
  state: defaultState,
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    RESET_STATE(state) {
      state.token = null;
      state.user = {};
    },
  },
  getters: {
    getUser(state) {
      if (getData("user")) {
        return getData("user");
      }
      return state.user;
    },
  },
  actions: {
    async login({ commit, dispatch }, credentials) {
      try {
        let response = await axios.post(endpoints.users.login, credentials);
        if (response.status == 200 && response.data.token) {
          storeData("userLogin", credentials);
          dispatch("setToken", response.data);
          return true;
        } else {
          commit(
            "SET_MESSAGE",
            {
              message: "Invalid Request",
              type: "error",
            },
            {
              root: true,
            }
          );
          return false;
        }
      } catch (error) {
        // { root: true } to access the global mutations
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
    async register({ commit, dispatch }, credentials) {
      try {
        let response = await axios.post(endpoints.users.register, credentials);
        storeData("userLogin", credentials);
        if (response.status == 200 && response.data.token) {
          dispatch("setToken", response.data);
          return true;
        } else {
          commit(
            "SET_MESSAGE",
            {
              message: "Invalid Request",
              type: "error",
            },
            {
              root: true,
            }
          );
          return false;
        }
      } catch (error) {
        // { root: true } to access the global mutations
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
    async setToken({ commit }, data) {
      storeData("token", data.token);
      commit("SET_TOKEN", data.token);
      commit(
        "SET_MESSAGE",
        {
          message: data.message,
          type: "success",
        },
        {
          root: true,
        }
      );
      /* get the user information */
      try {
        let response = await axios.get(endpoints.users.getUserData);
        commit("SET_USER", response.data.data);
        storeData("user", response.data.data);
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
    resetAuthState({ commit }) {
      commit("RESET_STATE");
    },
  },
};
