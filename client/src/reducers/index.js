import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import notificationReducer from "./notificationReducer";
import messageReducer from "./messageReducer";
export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  post: postReducer,
  notification: notificationReducer,
  message: messageReducer,
});
