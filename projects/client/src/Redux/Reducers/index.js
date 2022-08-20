import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

export const globalStore = combineReducers({
    userReducer
})