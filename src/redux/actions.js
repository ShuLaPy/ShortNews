import * as ShortsConstants from './constants';
import ExtractError from '../utils/extractError';
import {fetchShorts} from '../api';

export const fetchLatesthorts = category => (dispatch, getState) => {
  const {language} = getState().shorts;
  console.log('Language: ', language);
  return new Promise((resolve, reject) => {
    dispatch({
      type: ShortsConstants.START_LOADING,
    });
    fetchShorts(category, language)
      .then(response => {
        dispatch(setCurrentCard(0));
        dispatch({
          type: ShortsConstants.FETCH_NEW_SHORTS,
          payload: response.data.articles,
        });
        dispatch({
          type: ShortsConstants.STOP_LOADING,
        });
        resolve(response);
      })
      .catch(err => {
        dispatch({
          type: ShortsConstants.FETCH_NEW_SHORTS_ERR,
          payload: ExtractError(err),
        });
        dispatch({
          type: ShortsConstants.STOP_LOADING,
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

export const startPlaying = () => dispatch => {
  dispatch({
    type: ShortsConstants.START_PLAYING,
  });
};

export const stopPlaying = () => dispatch => {
  dispatch({
    type: ShortsConstants.STOP_PLAYING,
  });
};

export const setLanguage = language => dispatch => {
  dispatch({
    type: ShortsConstants.SET_LANGUAGE,
    payload: language,
  });
};
