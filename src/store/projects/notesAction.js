import axios from "axios";
import {
    endpoints
} from "../../api/urls";

import {
    getData,
    storeData
} from "../../utils/localStorage"

export default {
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
    async udpateNote({ commit }, udpateNoteObject) {
        try {

            const {
                status,
                data
            } = await axios.patch(endpoints.projects.notes, udpateNoteObject);

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

            // const project = getData("project");
            // let columnIndex = 0
            // let columnNotes = []
            // project.columns.forEach((column, index) => {
            //     if (column._id == deleteNoteObject.columnRef) {
            //         columnIndex = index
            //         columnNotes = column.notes.filter(note => note._id != deleteNoteObject.noteId)
            //     }
            // });

            // project.columns[columnIndex].notes = columnNotes

            // storeData("project", project);
            // commit("SET_PROJECT", project);

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
    async deleteNote({ commit }, deleteNoteObject) {
        try {
            console.log(deleteNoteObject);

            const {
                status,
                data
            } = await axios.delete(endpoints.projects.notes,
                { data: deleteNoteObject }
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
            let columnIndex = 0
            let columnNotes = []
            project.columns.forEach((column, index) => {
                if (column._id == deleteNoteObject.columnRef) {
                    columnIndex = index
                    columnNotes = column.notes.filter(note => note._id != deleteNoteObject.noteId)
                }
            });

            project.columns[columnIndex].notes = columnNotes

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