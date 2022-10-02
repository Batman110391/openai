import { SET_MESSAGE, SET_REVIEW } from "./store.actions";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_MESSAGE:
      const message = action.payload;

      return {
        ...state,
        message: message,
      };
    case SET_REVIEW:
      const review = action.payload;

      return {
        ...state,
        review: review,
      };
    default:
      return state;
  }
}
