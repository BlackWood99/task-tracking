import axios from "axios"
import {
	GET_TASKS,
	GET_PRIORITIES,
	GET_CURRENT_TASK,
	IS_OPEN_CREATE_MODAL,
	IS_OPEN_EDIT_MODAL,
    GET_STATUSES,
    GET_USERS,
} from "./constans"

let tenantguid = "563b6232-c1f9-4fb8-bd86-8413ba36848c"

const instance = axios.create({
	baseURL: "http://intravision-task.test01.intravision.ru",
})

// Actions ------------

const getTasksAC = (tasks) => {
	return {
		type: GET_TASKS,
		payload: tasks,
	}
}

const getPrioritiesAC = (priorities) => {
	return {
		type: GET_PRIORITIES,
		payload: priorities,
	}
}

const getStatusesAC = (statuses) => {
	return {
		type: GET_STATUSES,
		payload: statuses,
	}
}

const getUsersAC = (users) => {
	return {
		type: GET_USERS,
		payload: users,
	}
}

export const onShowCreateModal = (isOpen) => {
	return {
		type: IS_OPEN_CREATE_MODAL,
		payload: isOpen,
	}
}

export const onShowEditModal = (isOpen) => {
	return {
		type: IS_OPEN_EDIT_MODAL,
		payload: isOpen,
	}
}

const getCurrTaskAC = (task) => {
	return {
		type: GET_CURRENT_TASK,
		payload: task,
	}
}

// Requests ------------

export const getTasks = () => async (dispatch) => {
	try {
		const response = await instance.get(
			`/odata/tasks?tenantguid=${tenantguid}`
		)
		if (response.status === 200) dispatch(getTasksAC(response.data.value))
	} catch (error) {
		console.log("ERROR: " + error)
	}
}

export const getPriorities = () => async (dispatch) => {
	try {
		const response = await instance.get(`/api/${tenantguid}/Priorities`)
		if (response.status === 200)
			dispatch(getPrioritiesAC(response.data))
	} catch (error) {
		console.log("ERROR: " + error)
	}
}

export const getStatuses = () => async (dispatch) => {
	try {
		const response = await instance.get(`/api/${tenantguid}/Statuses`)
		if (response.status === 200)
			dispatch(getStatusesAC(response.data))
	} catch (error) {
		console.log("ERROR: " + error)
	}
}

export const getUsers = () => async (dispatch) => {
	try {
		const response = await instance.get(`/api/${tenantguid}/Users`)
		if (response.status === 200)
			dispatch(getUsersAC(response.data))
	} catch (error) {
		console.log("ERROR: " + error)
	}
}

export const getCurrTask = (id) => async (dispatch) => {
	try {
		const response = await instance.get(`/api/${tenantguid}/Tasks/${id}`)
		if (response.status === 200) {
            dispatch(getCurrTaskAC(response.data))
        }
	} catch (error) {
		console.log("ERROR: " + error)
	}
}

export const addTask = (task) => async (dispatch) => {
	try {
		const response = await instance.post(`/api/${tenantguid}/Tasks`, task)
		if (response.status === 200) {
            dispatch(getCurrTask(response.data))
			dispatch(getTasks())
        }
	} catch (error) {
		console.log("ERROR: " + error)
	}
}

export const updateTask = (updatedTask) => async (dispatch) => {
	try {
		const response = await instance.put(`/api/${tenantguid}/Tasks`, updatedTask)
		if (response.status === 200) {
            dispatch(getCurrTask(updatedTask.id))
            dispatch(getTasks())
        }
	} catch (error) {
		console.log("ERROR: " + error)
	}
}


