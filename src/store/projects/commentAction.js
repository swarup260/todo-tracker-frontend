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
    async getComment({ commit }, { noteId }) {
        try {
            const {
                status,
                data
            } = await axios.get(
                `${endpoints.projects.comment}/${noteId}`
            );

            if (status != 200) {
                commit(
                    "SET_MESSAGE", {
                    message: data.message,
                    type: "error",
                }, {
                    root: true,
                }
                )
                return true;
            }
            const project = getData("project");

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
    async addComment({ commit }, newData) {
        try {
            const {
                status,
                data
            } = await axios.post(
                endpoints.projects.comment,
                newData
            );

            if (status != 200) {
                commit(
                    "SET_MESSAGE", {
                    message: data.message,
                    type: "error",
                }, {
                    root: true,
                }
                )
                return true;
            }
            const project = getData("project");
            const { noteId , columnRef  } = newData
            const projectDictIndex = ProjectDict.colDict
            const colIndex = projectDictIndex[columnRef]
            const noteIndex = colIndex.noteIndexes[noteId]
            project.columns[colIndex.index].notes[noteIndex.index] = data.data

            commit("SET_COMMENTS",data.data.comments)
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
    async udpateComment({ commit }, udpateObject) {
        try {

            const {
                status,
                data
            } = await axios.patch(endpoints.projects.comment, udpateObject);

            console.log(data);
            if (status != 200) {
                commit(
                    "SET_MESSAGE", {
                    message: data.message,
                    type: "error",
                }, {
                    root: true,
                }
                )
                return true;
            }

            const project = getData("project");
            const { noteId , columnRef } = udpateObject
            const projectDictIndex = ProjectDict.colDict
            const colIndex = projectDictIndex[columnRef]
            const noteIndex = colIndex.noteIndexes[noteId]
            project.columns[colIndex.index].notes[noteIndex.index] = data.data

            commit("SET_COMMENTS",data.data.comments)
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
    async deleteComment({ commit }, deleteObject) {
        try {
            console.log(deleteObject);

            const {
                status,
                data
            } = await axios.delete(endpoints.projects.comment,
                { data: deleteObject }
            );

            if (status != 200) {
                commit(
                    "SET_MESSAGE", {
                    message: data.message,
                    type: "error",
                }, {
                    root: true,
                }
                )
                return true;
            }

            const project = getData("project");
            const { noteId , columnRef } = deleteObject
            const projectDictIndex = ProjectDict.colDict
            const colIndex = projectDictIndex[columnRef]
            const noteIndex = colIndex.noteIndexes[noteId]
            project.columns[colIndex.index].notes[noteIndex.index] = data.data


            commit("SET_COMMENTS",data.data.comments)
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
    updateCommentState({ commit },state){
        console.log("updateCommentState",state);
        commit("SET_COMMENTS",state)
    }

}