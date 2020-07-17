import axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

import {
  GET_NOTIFICATIONS,
  NOTIFICATIONS_LOADING,
  MARK_NOTIFICATIONS_AS_READ,
} from "./types";

export const getNotifications = () => (dispatch, getState) => {
  dispatch(setNotificationsLoading());
  axios
    .get("/api/notifications", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const markNotificationsAsRead = () => (dispatch, getState) => {
  axios
    .post("/api/notifications/read", null, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: MARK_NOTIFICATIONS_AS_READ,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setNotificationsLoading = () => {
  return {
    type: NOTIFICATIONS_LOADING,
  };
};
