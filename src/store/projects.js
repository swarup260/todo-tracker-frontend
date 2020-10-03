import axios from "axios";
import { endpoints } from "../api/urls";

import { getData, storeData } from "../utils/localStorage";

const defaultState = {
  projects: [],
};

export default {
  namespaced: true,
  state: defaultState,
  mutations: {
    SET_PROJECTS(state, projects) {
      state.projects = projects;
      storeData("projects", state.projects);
    },
    ADD_PROJECTS(state, project) {
      state.projects.push(project);
      const projects = getData("projects");
      projects.push(project);
      storeData("projects", projects);
    },
    RESET_STATE(state) {
      state.columns = [];
    },
  },
  getters: {
    getProjects(state) {
      if (getData("projects")) {
        state.projects = getData("projects");
      }
      return state.projects;
    },
  },
  actions: {
    async fetchProjects({ commit }) {
      try {
        const { data, status } = await axios.get(endpoints.projects.projects);
        if (status == 200) {
          commit("SET_PROJECTS", data.data);
        }
      } catch (error) {
        let message;
        if (error.response) {
          message = error.response.data.message;
        } else {
          message = error.toString();
        }
        commit(
          "SET_MESSAGE",
          { message: message, type: "error" },
          { root: true }
        );
      }
    },
    async addProject({ commit }, newData) {
      try {
        const { status, data } = await axios.post(
          endpoints.projects.projects,
          newData
        );

        if (status == 200) {
          commit("ADD_PROJECTS", data.data);

          /* set the messages */
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
          return true;
        }
      } catch (error) {
        let message;
        if (error.response) {
          message = error.response.data.message;
        } else {
          message = error.toString();
        }
        commit(
          "SET_MESSAGE",
          { message: message, type: "error" },
          { root: true }
        );
      }
    },
    resetProjects({ commit }) {
      commit("RESET_STATE");
    },
  },
};
