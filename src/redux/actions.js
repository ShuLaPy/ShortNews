import * as ShortsConstants from './constants';
import ExtractError from '../utils/extractError';
import {fetchShorts} from '../api';

export const fetchLatesthorts = category => dispatch => {
  return new Promise((resolve, reject) => {
    fetchShorts(category)
      .then(response => {
        dispatch({
          type: ShortsConstants.FETCH_NEW_SHORTS,
          payload: response.data.articles,
        });
        dispatch({
          type: ShortsConstants.SELECT_CARD,
          payload: 0,
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

export const setCurrentCard = index => dispatch => {
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
