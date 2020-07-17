import { GET_MESSAGES, MESSAGES_LOADING, ADD_MESSAGE } from "../actions/types";

const initialState = {
  messages: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MESSAGES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case GET_MESSAGES:
      return {
        messages: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
