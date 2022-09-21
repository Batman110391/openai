export const SET_DOCUMENTS = 'SET_DOCUMENTS';
export const SET_ORDER_DOC = 'SET_ORDER_DOC';
export const SET_COLLECTION = 'SET_COLLECTION';
export const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';
export const SET_CHECKED_ALL_LIST = 'SET_CHECKED_ALL_LIST';
export const SET_CURRENT_FILTER = 'SET_CURRENT_FILTER';
export const SET_LOADING = 'SET_LOADING';
export const RESET_DOCUMENTS = 'RESET_DOCUMENTS';
export const CHECK_NEW_DOCUMENTS = 'CHECK_NEW_DOCUMENTS';
export const LAST_DATE_ACQUISITION = 'LAST_DATE_ACQUISITION';

export function setLoading(bool) {
  return {
    type: SET_LOADING,
    payload: bool,
  };
}

export function setDocuments(documents) {
  return {
    type: SET_DOCUMENTS,
    payload: documents,
  };
}

export function setOrderDocuments(order) {
  return {
    type: SET_ORDER_DOC,
    payload: order,
  };
}

export function setCollection(collection) {
  return {
    type: SET_COLLECTION,
    payload: collection,
  };
}

export function setCurrentArticle(articleId) {
  return {
    type: SET_CURRENT_ARTICLE,
    payload: articleId,
  };
}

export function setCheckedAlList(bool) {
  return {
    type: SET_CHECKED_ALL_LIST,
    payload: bool,
  };
}

export function setCurrentFilter(currentFilter) {
  return {
    type: SET_CURRENT_FILTER,
    payload: currentFilter,
  };
}

export function resetDocuments() {
  return {
    type: RESET_DOCUMENTS,
  };
}

export function setCheckNewDocuments(bool) {
  return {
    type: CHECK_NEW_DOCUMENTS,
    payload: bool,
  };
}

export function setLastDateAcquisition(data) {
  return {
    type: LAST_DATE_ACQUISITION,
    payload: data,
  };
}
