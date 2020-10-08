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
  noteModalState: false,
  project: {},
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
    SET_NOTE_MODAL_STATE(state, status) {
      state.noteModalState = status;
    },
    SET_PROJECT(state, project) {
      state.project = project;
      storeData("project", state.project);
    },
    RESET_STATE(state) {
      state.projects = [];
      state.project = {};
      state.modalState = false;
    },
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
    getNoteModalState(state) {
      return state.noteModalState;
    },
    getProject(state) {
      if (getData("project")) {
        state.project = getData("project");
      }
      return state.project;
    },
  },
  actions: {
    /* Projects Actions  */
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
            type: "error",
          }, {
            root: true,
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
            type: "error",
          }, {
            root: true,
          }
        );
      }
    },
    async fetchProjectCols({
      commit
    }, id) {
      try {
        const {
          data,
          status
        } = await axios.get(
          `${endpoints.projects.column}/${id}`
        );
        if (status == 200) {
          console.log(data);
          commit("SET_PROJECT", data.data);
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
            type: "error",
          }, {
            root: true,
          }
        );
      }
    },
    /* Columns Actions */
    async updateProject({
      commit
    }, udpateData) {
      try {
        const {
          status,
          data
        } = await axios.patch(
          endpoints.projects.projects,
          udpateData
        );

        if (status == 200) {
          const id = data._id;
          const projects = getData("projects");
          for (let index = 0; index < projects.length; index++) {
            if (projects[index]._id == id) {
              projects[index] = data.data;
            }
          }
          storeData("projects", projects);
          commit("SET_PROJECTS", projects);

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
            type: "error",
          }, {
            root: true,
          }
        );
      }
    },
    async addColumn({
      commit
    }, newData) {
      try {
        const {
          status,
          data
        } = await axios.post(
          endpoints.projects.column,
          newData
        );

        if (status == 200) {

          const project = getData("project");
          project.columns = data.data.columns;
          storeData("project", project);
          commit("SET_PROJECT", project);

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
            type: "error",
          }, {
            root: true,
          }
        );
      }
    },
    /* Note Actions */
    async addNote({
      commit
    }, newData) {
      try {
        const {
          status,
          data
        } = await axios.post(
          endpoints.projects.notes,
          newData
        );

        if (status == 200) {

          const project = getData("project");
          for (let index = 0; index < project.columns.length; index++) {
            const column = project.columns[index];
            if (column._id == newData.update.columnRef) {
              column.notes.push(data.data);
            }
            
          }
          storeData("project", project);
          commit("SET_PROJECT", project);

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
            type: "error",
          }, {
            root: true,
          }
        );
      }
    },
    /* Helper Actions */
    setModalState({
      commit
    }, status) {
      console.log(status);
      commit("SET_MODAL_STATE", status);
    },
    setNoteModalState({
      commit
    }, status) {
      console.log(status);
      commit("SET_NOTE_MODAL_STATE", status);
    },
    resetProjects({
      commit
    }) {
      commit("RESET_STATE");
    },
  },
};