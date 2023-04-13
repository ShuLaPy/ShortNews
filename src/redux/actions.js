import * as ShortsConstants from './constants';
import ExtractError from '../utils/extractError';
import {fetchShorts} from '../api';

export const fetchLatesthorts = category => dispatch => {
  return new Promise((resolve, reject) => {
    fetchShorts(category)
      .then(response => {
        dispatch(setCurrentCard(0));
        dispatch({
          type: ShortsConstants.FETCH_NEW_SHORTS,
          payload: response.data.articles,
        });
        resolve(response);
      })
      .catch(err => {
        dispatch({
          type: ShortsConstants.FETCH_NEW_SHORTS_ERR,
          payload: ExtractError(err),
        });
        reject(err);
      });
  });
};

export const fetchLatestBookmarks = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(setCurrentCard(0));
    dispatch({
      type: ShortsConstants.FETCH_BOOKMARKS,
    });
    resolve(true);
  });
};

export const addToBookmarks = article => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: ShortsConstants.ADD_TO_BOOKMARKS,
      payload: article,
    });
    resolve(true);
  });
};

export const removeFromBookmarks = article => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: ShortsConstants.REMOVE_FROM_BOOKMARK,
      payload: article,
    });
    resolve(true);
  });
};

export const setCurrentCard = index => dispatch => {
  console.log('Set Current Card: ', index);
  dispatch({
    type: ShortsConstants.SELECT_CARD,
    payload: index,
  });
};

export const setCategory = category => dispatch => {
  dispatch({
    type: ShortsConstants.SELECT_CATEGORY,
    payload: category,
  });
};

export const setCurrentUser = userData => dispatch => {
  dispatch({
    type: ShortsConstants.AUTHONTICATION_SUCCESS,
    payload: userData,
  });
};
