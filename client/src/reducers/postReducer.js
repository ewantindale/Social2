import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  LOGOUT_SUCCESS,
  LIKE_POST,
} from "../actions/types";

const initialState = {
  posts: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case LIKE_POST:
      return {
        ...state,
        posts: [
          ...state.posts.map((post) =>
            post._id === action.payload.postId
              ? {
                  ...post,
                  likedBy: post.likedBy.includes(action.payload.userId)
                    ? post.likedBy.filter(
                        (likeUserId) => likeUserId !== action.payload.userId
                      )
                    : [...post.likedBy, action.payload.userId],
                }
              : post
          ),
        ],
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
