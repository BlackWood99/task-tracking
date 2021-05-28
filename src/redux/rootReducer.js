import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import tasksReducer from "./tasksReducer";


export const rootReducer = combineReducers({
    tasksPage: tasksReducer,
    modalPage: modalReducer,
})