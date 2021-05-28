import { GET_PRIORITIES, GET_STATUSES, GET_TASKS, GET_USERS } from "./constans"

const initialState = {
    tasks: [],
    priorities: [],
    statuses: [],
    users: []
}

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASKS:
            return { ...state, tasks: action.payload }
        case GET_PRIORITIES:
            return { ...state, priorities: action.payload }
        case GET_STATUSES:
            return { ...state, statuses: action.payload }
        case GET_USERS:
            return { ...state, users: action.payload }
        default:
            return state
    }
}

export default tasksReducer