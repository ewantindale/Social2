import axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

import { GET_NOTIFICATIONS, NOTIFICATIONS_LOADING } from "./types";

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

export const setNotificationsLoading = () => {
  return {
    type: NOTIFICATIONS_LOADING,
  };
};
