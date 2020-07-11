import { GET_NOTIFICATIONS, NOTIFICATIONS_LOADING } from "../actions/types";

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
    default:
      return state;
  }
}
