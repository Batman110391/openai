export const SET_MESSAGE = "SET_MESSAGE";
export const SET_REVIEW = "SET_REVIEW";
export const SET_DIFF_TEXT = "SET_DIFF_TEXT";
export const SET_FIND_IMAGES = "SET_FIND_IMAGES";

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

export function setDiffText(diffText) {
  return {
    type: SET_DIFF_TEXT,
    payload: diffText,
  };
}

export function setFindImages(query) {
  return {
    type: SET_FIND_IMAGES,
    payload: query,
  };
}
