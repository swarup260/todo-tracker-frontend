import axios from "axios";
import {
	endpoints
} from "../../api/urls";

import {
	getData,
	storeData
} from "../../utils/localStorage"

export default {
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
    async deleteColumn({
        commit
    }, {
        projectId,
        columnId
    }) {
        try {
            const {
                status,
                data
            } = await axios.delete(
                `${endpoints.projects.column}/${projectId}/${columnId}`
            );

            if (status == 200) {
                const project = getData("project");
                project.columns = project.columns.filter(
                    (item) => item._id != columnId
                );
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
    async updateColumn({
        commit
    }, {
        updateData,
        multi
    }) {
        try {
            let URL = endpoints.projects.column;
            if (multi) {
                URL = `${endpoints.projects.column}?_multi=true`;
            }

            const {
                status,
                data
            } = await axios.patch(URL, updateData);

            if (status == 200) {
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
        return false;
    },
}