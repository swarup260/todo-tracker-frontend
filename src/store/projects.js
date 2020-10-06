import axios from "axios";
import {
  endpoints
} from "../api/urls";

import {
  getData,
  storeData
} from "../utils/localStorage";

const defaultState = {
  projects: [],
  modalState: false,
  project: {}
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
    SET_MODAL_STATE(state, status) {
      state.modalState = status;
    },
    SET_PROJECT(state, project) {
      state.project = project;
      storeData("project", state.project);
    },
    RESET_STATE(state) {
      state.projects = [];
      state.project = {};
      state.modalState = false;

    }
  },
  getters: {
    getProjects(state) {
      if (getData("projects")) {
        state.projects = getData("projects");
      }
      return state.projects;
    },
    getModalState(state) {
      return state.modalState;
    },
    getProject(state) {
      if (getData("project")) {
        state.project = getData("project");
      }
      return state.project;
    },
  },
  actions: {
    async fetchProjects({
      commit
    }) {
      try {
        const {
          data,
          status
        } = await axios.get(endpoints.projects.projects);
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
          "SET_MESSAGE", {
            message: message,
            type: "error"
          }, {
            root: true
          }
        );
      }
    },
    async addProject({
      commit
    }, newData) {
      try {
        const {
          status,
          data
        } = await axios.post(
          endpoints.projects.projects,
          newData
        );

        if (status == 200) {
          commit("ADD_PROJECTS", data.data);

          /* set the messages */
          commit(
            "SET_MESSAGE", {
              message: data.message,
              type: "success",
            }, {
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
          "SET_MESSAGE", {
            message: message,
            type: "error"
          }, {
            root: true
          }
        );
      }
    },
    async fetchProject({
      commit
    }, id) {
      try {
        const {
          data,
          status
        } = await axios.get(`${endpoints.projects.projects}/${id}`);
        if (status == 200) {
          commit("SET_PROJECT", data.data[0]);
        }
      } catch (error) {
        let message;
        if (error.response) {
          message = error.response.data.message;
        } else {
          message = error.toString();
        }
        commit(
          "SET_MESSAGE", {
            message: message,
            type: "error"
          }, {
            root: true
          }
        );
      }
    },
    setModalState({
      commit
    }, status) {
      console.log(status);
      commit("SET_MODAL_STATE", status);
    },
    resetProjects({
      commit
    }) {
      commit("RESET_STATE");
    },
  },
};
