import * as ShortsConstants from './constants';

export const ShortsReducer = (
  state = {
    shortsList: [],
    bookmarks: [],
    isPlaying: false,
  },
  action,
) => {
  switch (action.type) {
    case ShortsConstants.FETCH_NEW_SHORTS:
      return {...state, shortsList: action.payload};
    case ShortsConstants.NEW_SHORTS_UPDATE:
      return {...state, shortsList: {...state.shortsList, ...action.payload}};
    case ShortsConstants.FETCH_NEW_SHORTS_ERR:
      console.log('Erro');
      return {...state, error: action.payload};
    case ShortsConstants.ADD_TO_BOOKMARKS:
      return {...state, bookmarks: [...state.bookmarks, action.payload]};
    case ShortsConstants.FETCH_BOOKMARKS:
      return {...state, shortsList: [...state.bookmarks]};
    case ShortsConstants.REMOVE_FROM_BOOKMARK:
      const newBookmarks = state.bookmarks.filter(
        post => post.title !== action.payload.title,
      );
      return {...state, bookmarks: [...newBookmarks]};
    case ShortsConstants.START_PLAYING:
      return {...state, isPlaying: true};
    case ShortsConstants.STOP_PLAYING:
      return {...state, isPlaying: false};
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

export const setCategoryReducer = (state = 'all_news', action) => {
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
