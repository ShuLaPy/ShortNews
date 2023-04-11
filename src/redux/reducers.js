import * as ShortsConstants from './constants';

export const ShortsReducer = (state = {shortsList: []}, action) => {
  switch (action.type) {
    case ShortsConstants.FETCH_NEW_SHORTS:
      return {shortsList: action.payload};
    case ShortsConstants.NEW_SHORTS_UPDATE:
      return {...state, shortsList: {...state.shortsList, ...action.payload}};
    case ShortsConstants.FETCH_NEW_SHORTS_ERR:
      console.log('Erro');
      return {...state, error: action.payload};
    default:
      return state;
  }
};

export const setCardReducer = (state = 0, action) => {
  switch (action.type) {
    case ShortsConstants.SELECT_CARD:
      return action.payload;
    default:
      return state;
  }
};

export const setCategoryReducer = (state = 0, action) => {
  switch (action.type) {
    case ShortsConstants.SELECT_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};

export const authReducer = (state = {user: null}, action) => {
  switch (action.type) {
    case ShortsConstants.AUTHONTICATION_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
