import {
  GET_NOTIFICATIONS,
  NOTIFICATIONS_LOADING,
  MARK_NOTIFICATIONS_AS_READ,
} from "../actions/types";

const initialState = {
  notifications: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NOTIFICATIONS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_NOTIFICATIONS:
      return {
        notifications: action.payload,
        loading: false,
      };
    case MARK_NOTIFICATIONS_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map((n) => ({
          ...n,
          read: true,
        })),
      };
    default:
      return state;
  }
}
