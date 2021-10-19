import { combineReducers } from "redux";
import taskReducer from "./tasks.slice";
export const rootReducer = combineReducers({ tasks: taskReducer });
