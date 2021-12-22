import { combineReducers } from "redux";
import LigaReducer from "./liga";
import JerseyReducer from "./jersey";

export default combineReducers({ LigaReducer, JerseyReducer });
