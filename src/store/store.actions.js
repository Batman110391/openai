export const SET_MESSAGE = "SET_MESSAGE";
export const SET_REVIEW = "SET_REVIEW";

export function setMessage(message) {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
}

export function setReview(review) {
  return {
    type: SET_REVIEW,
    payload: review,
  };
}
