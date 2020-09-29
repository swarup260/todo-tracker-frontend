// import axios from "axios";
// import {
//     endpoints
// } from "../api/urls";

import {
    getData,
    storeData
} from "../utils/localStorage";

const defaultState = {
    columns: [{
            _id: 1,
            name: "COL",
            rows: [{
                    id: 1,
                    name: "S-COL",
                },
                {
                    id: 2,
                    name: "M-COL",
                },
                {
                    id: 3,
                    name: "D-COL",
                },
            ],
        },
        {
            _id: 2,
            name: "COL2",
            rows: [{
                    id: 1,
                    name: "S",
                },
                {
                    id: 2,
                    name: "M",
                },
                {
                    id: 3,
                    name: "d",
                },
            ],
        },
        {
            _id: 3,
            name: "COL3",
            rows: [{
                    id: 1,
                    name: "S",
                },
                {
                    id: 2,
                    name: "M",
                },
                {
                    id: 3,
                    name: "d",
                },
            ],
        },
    ]
};

export default {
    namespaced: true,
    state: defaultState,
    mutations: {
        SET_COLUMNS(state, columns) {
            state.columns = columns;
            storeData("columns", state.columns);
        },
        RESET_STATE(state) {
            state.columns = [];
        },
    },
    getters: {
        getColumns(state) {
            if (getData("columns")) {
                state.columns = getData("columns");
            }
            return state.columns;
        },
    },
    actions: {
        fetchColumn() {
            console.log("Fetching.......")
        },
        resetProjects({
            commit
        }) {
            commit("RESET_STATE")
        }
    },
};