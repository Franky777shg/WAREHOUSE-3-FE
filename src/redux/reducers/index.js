import userReducer from "./userReducer";
import adminReducer from "./__admin/adminReducer";
import { combineReducers } from "redux";

export default combineReducers({ userReducer, adminReducer });
