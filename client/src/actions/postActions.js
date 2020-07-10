import axios from "axios";
import { GET_POSTS, ADD_POST, POSTS_LOADING, LIKE_POST } from "./types";
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

export const likePost = (id) => (dispatch, getState) => {
  axios
    .post(`/api/posts/${id}/like`, null, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: LIKE_POST,
        payload: {
          postId: id,
          userId: getState().auth.user.id,
        },
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
