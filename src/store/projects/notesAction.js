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
            const columnRef = newData.update.columnRef
            const projectDictIndex = ProjectDict.colDict
            const colIndex = projectDictIndex[columnRef]
            project.columns[colIndex.index].notes.push(data.data)
            ProjectDict.colDict = project.columns
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

            const project = getData("project");
            const projectDictIndex = ProjectDict.colDict
            const { noteId, columnRef } = udpateNoteObject
            const colIndex = projectDictIndex[columnRef]
            const noteIndex = colIndex.noteIndexes[noteId]
            project.columns[colIndex.index].notes[noteIndex.index] = data.data

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
            const { columnRef } = deleteNoteObject
            const projectDictIndex = ProjectDict.colDict
            const colIndex = projectDictIndex[columnRef]
            const columnNotes = project.columns[colIndex.index]
                .notes
                .filter(note => note._id != deleteNoteObject.noteId)


            project.columns[colIndex.index].notes = columnNotes

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