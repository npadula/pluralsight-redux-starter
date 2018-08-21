//Root reducer
import { combineReducers } from "redux";
import courseReducer from './courseReducer';
import authorReducer from "./authorReducer";
import ajaxCallsInProgress from "./ajaxStatusReducer";

const rootReducer = combineReducers({
    courses: courseReducer,
    authors: authorReducer,
    ajaxCallsInProgress
});


export default rootReducer;