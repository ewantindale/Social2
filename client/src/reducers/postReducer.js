import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  LOGOUT_SUCCESS,
  LIKE_POST,
  ADD_COMMENT,
  LIKE_COMMENT,
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
    case ADD_COMMENT:
      return {
        ...state,
        posts: [
          ...state.posts.map((post) =>
            post._id === action.payload.id
              ? {
                  ...post,
                  comments: [action.payload.comment, ...post.comments],
                }
              : post
          ),
        ],
      };
    case LIKE_COMMENT:
      return {
        ...state,
        posts: [
          ...state.posts.map((post) =>
            post._id === action.payload.postId
              ? {
                  ...post,
                  comments: [
                    ...post.comments.map((comment) =>
                      comment._id === action.payload.commentId
                        ? {
                            ...comment,
                            likedBy: comment.likedBy.includes(
                              action.payload.userId
                            )
                              ? comment.likedBy.filter(
                                  (likeUserId) =>
                                    likeUserId !== action.payload.userId
                                )
                              : [...comment.likedBy, action.payload.userId],
                          }
                        : comment
                    ),
                  ],
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
