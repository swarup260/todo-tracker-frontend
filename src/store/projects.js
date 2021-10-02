import {
	getData,
	storeData
} from "../utils/localStorage";

import columnsAction from "./projects/columnsAction";
import projectsAction from "./projects/projectsAction";
import notesAction from "./projects/notesAction";
import commentAction from "./projects/commentAction";

const defaultState = {
	projects: [],
	modalState: {
		isActive: false,
		type: "",
		data: {},
	},
	noteModalState: {
		isActive: false,
		columnID: "",
	},
	project: {},
	isLoading: false,
	comments : []
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
		SET_MODAL_STATE(state, {
			isActive,
			type,
			data
		}) {
			state.modalState.isActive = isActive;
			state.modalState.type = type;
			state.modalState.data = data;
		},
		SET_NOTE_MODAL_STATE(state, {
			isActive,
			columnID
		}) {
			state.noteModalState.isActive = isActive;
			state.noteModalState.columnID = columnID;
		},
		SET_PROJECT(state, project) {
			state.project = project;
			storeData("project", state.project);
		},
		SET_LOADING_STATE(state, value) {
			state.isLoading = value;
		},
		SET_COMMENTS(state , comments){
			state.comments = comments
		},
		RESET_STATE(state) {
			state.projects = [];
			state.comments = [];
			state.project = {};
			state.modalState = false;
			state.isLoading = false;
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
		getNoteModalState(state) {
			return state.noteModalState;
		},
		getProject(state) {
			if (getData("project")) {
				state.project = getData("project");
			}
			return state.project;
		},
		getLoadingState(state) {
			return state.isLoading;
		},
		getComments(state) {
			console.log("STORE comments",state.comments);
			return state.comments
		}
	},
	actions: {
		/* Projects Actions  */
		...projectsAction,
		/* Columns Actions */
		...columnsAction,
		/* Note Actions */
		...notesAction,
		/* Comment Actions */
		...commentAction,
		/* Helper Actions */
		setModalState({
			commit
		}, object) {
			console.log(object);
			commit("SET_MODAL_STATE", object);
		},
		setNoteModalState({
			commit
		}, object) {
			console.log(object);
			commit("SET_NOTE_MODAL_STATE", object);
		},
		resetProjects({
			commit
		}) {
			commit("RESET_STATE");
		},
		setLoadingState({
			commit
		}, state) {
			commit("SET_LOADING_STATE", state);
		}
	},
};