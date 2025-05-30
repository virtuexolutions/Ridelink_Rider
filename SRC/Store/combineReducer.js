import { combineReducers } from "redux";
import authReducer from "./slices/auth-slice";
import commonReducer from "./slices/common";
import socketReducer from "./slices/socket";

export default combineReducers({ authReducer, commonReducer, socketReducer });
