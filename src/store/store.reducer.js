import { SET_MESSAGE } from "./store.actions";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_MESSAGE:
      const message = action.payload;

      return {
        ...state,
        message: message,
      };

    default:
      return state;
  }
}
