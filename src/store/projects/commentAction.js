import axios from "axios";
import {
    endpoints
} from "../../api/urls";

import {
    getData,
    storeData
} from "../../utils/localStorage"

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
            // let columnIndex = 0
            // let columnNotes = []
            // project.columns.forEach((column, index) => {
            //     if (column._id == deleteNoteObject.columnRef) {
            //         columnIndex = index
            //         columnNotes = column.notes.filter(note => note._id != deleteNoteObject.noteId)
            //     }
            // });

            // project.columns[columnIndex].notes = columnNotes

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
            // let columnIndex = 0
            // let columnNotes = []
            // project.columns.forEach((column, index) => {
            //     if (column._id == deleteNoteObject.columnRef) {
            //         columnIndex = index
            //         columnNotes = column.notes.filter(note => note._id != deleteNoteObject.noteId)
            //     }
            // });

            // project.columns[columnIndex].notes = columnNotes

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
    }

}