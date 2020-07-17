import axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

import { GET_MESSAGES, MESSAGES_LOADING, ADD_MESSAGE } from "./types";

export const getMessages = () => (dispatch, getState) => {
  dispatch(setMessagesLoading());
  axios
    .get("/api/messages", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_MESSAGES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addMessage = (message) => (dispatch, getState) => {
  axios
    .post("/api/messages", message, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_MESSAGE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setMessagesLoading = () => {
  return {
    type: MESSAGES_LOADING,
  };
};
