import axios from "axios";
import { GET_POSTS, ADD_POST, POSTS_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const addPost = (post) => (dispatch, getState) => {
  axios
    .post("/api/posts", post, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getPosts = () => (dispatch, getState) => {
  dispatch(setPostsLoading());
  axios
    .get("/api/posts", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING,
  };
};
