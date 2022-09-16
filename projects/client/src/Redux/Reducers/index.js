import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { userCheckoutReducer } from "./userCheckoutReducer";

export const globalStore = combineReducers({
    userReducer,
    userCheckoutReducer
})