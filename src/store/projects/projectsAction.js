import axios from "axios";
import {
    endpoints
} from "../../api/urls";

import {
    getData,
    storeData
} from "../../utils/localStorage"

import ProjectDict from "./ProjectDict";

export default {
    async fetchProjects({
        commit,
        dispatch
    }) {
        try {
            dispatch("setLoadingState", true);
            const {
                data,
                status
            } = await axios.get(endpoints.projects.projects);
            if (status == 200) {
                commit("SET_PROJECTS", data.data);
                dispatch("setLoadingState", false);
            }
        } catch (error) {
            dispatch("setLoadingState", false);
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
                /* Update Project Dictionary Index */
                ProjectDict.colDict = data.data.columns
                commit("SET_PROJECT", data.data);
            }
        } catch (error) {
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
    async deleteProject({
        commit
    }, projectID) {
        try {
            console.log(projectID);
            const {
                status,
                data
            } = await axios.delete(
                `${endpoints.projects.projects}/${projectID}`
            );

            if (status == 200) {
                const projects = getData("projects").filter(
                    (project) => project._id != projectID
                );
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
                const id = data.data._id;
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
    updateProjectState({
        commit
    }, project) {
        /* Update Project Dictionary Index */
        ProjectDict.colDict = project.columns
        commit("SET_PROJECT", project);
    }
}