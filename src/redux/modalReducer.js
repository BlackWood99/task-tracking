import {
	GET_CURRENT_TASK,
	IS_OPEN_CREATE_MODAL,
	IS_OPEN_EDIT_MODAL
} from "./constans"

const initialState = {
	editModalIsOpen: false,
	createModalIsOpen: false,

	currentTask: {},
}

const modalReducer = (state = initialState, action) => {
	switch (action.type) {
		case IS_OPEN_EDIT_MODAL:
			return { ...state, editModalIsOpen: action.payload }
		case IS_OPEN_CREATE_MODAL:
			return { ...state, createModalIsOpen: action.payload }
		case GET_CURRENT_TASK:
			return { ...state, currentTask: action.payload }
		default:
			return state
	}
}

export default modalReducer
