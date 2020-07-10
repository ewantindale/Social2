import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  post: postReducer,
});
