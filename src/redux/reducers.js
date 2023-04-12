import * as ShortsConstants from './constants';

export const ShortsReducer = (
  state = {
    shortsList: [],
    bookmarks: [
      {
        image:
          'https://static.inshorts.com/inshorts/images/v1/variants/jpg/m/2023/04_apr/12_wed/img_1681302499164_486.jpg?',
        auther_name: 'Pragya Swastik',
        title:
          "Metro rake runs under river for the first time in India's history in Kolkata",
        content:
          'Kolkata Metro on Wednesday created history, as for the first time in India, a metro rake ran under any river. "Regular trial runs from Howrah Maidan to Esplanade will start very soon," Metro Rail Kolkata\'s official Twitter account said as it shared the rake\'s video. The rake travelled through a tunnel connecting Kolkata with Howrah under the Hooghly River.',
        source_url:
          'https://twitter.com/metrorailwaykol/status/1646124044838932481?s=20&utm_campaign=fullarticle&utm_medium=referral&utm_source=inshorts',
        source_name: 'Twitter',
        created_At: 1681303241000,
        categories: ['national'],
        bottom_headline: 'To watch the video of the underwater metro trial',
        bottom_text: 'Tap here',
        bottom_link:
          'https://twitter.com/metrorailwaykol/status/1646124044838932481?s=20&utm_campaign=fullarticle&utm_medium=referral&utm_source=inshorts',
        byline: 'swipe left for more at Twitter / ',
      },
      {
        image:
          'https://static.inshorts.com/inshorts/images/v1/variants/jpg/m/2023/04_apr/12_wed/img_1681301123255_447.jpg?',
        auther_name: 'Saurabh Sinha',
        title: 'Amid COVID-19 surge, Serum Institute resumes making Covishield',
        content:
          'Amid a surge in COVID-19 cases, Serum Institute of India (SII) has resumed manufacturing Covishield vaccines, its CEO Adar Poonawalla said on Wednesday. "Just as a precaution...we have done it so that people have Covishield as a choice if they want it," Poonawalla said. The company had stopped manufacturing Covishield in December 2021.',
        source_url:
          'https://theprint.in/economy/serum-institute-of-india-restarts-manufacturing-of-covid-19-vaccine-covishield/1513897/?amp=&utm_campaign=fullarticle&utm_medium=referral&utm_source=inshorts',
        source_name: 'The Print',
        created_At: 1681303006000,
        categories: ['Coronavirus', 'national'],
        bottom_headline: 'Demand for Covovax is exactly zero: Poonawalla',
        bottom_text: 'Tap to read more',
        bottom_link:
          'https://theprint.in/economy/serum-institute-of-india-restarts-manufacturing-of-covid-19-vaccine-covishield/1513897/?amp=&utm_campaign=fullarticle&utm_medium=referral&utm_source=inshorts',
        byline: 'swipe left for more at The Print / ',
      },
      {
        image:
          'https://static.inshorts.com/inshorts/images/v1/variants/jpg/m/2023/04_apr/12_wed/img_1681300317722_145.jpg?',
        auther_name: 'Arnab Mukherji ',
        title:
          'Rohit takes selfie with fans post 1st IPL 2023 win, MI share video',
        content:
          "MI captain Rohit Sharma was seen taking a selfie with fans following his team's maiden IPL 2023 win against DC in Delhi, in a video of the moment that was shared by MI's official YouTube channel. The fans were heard cheering after the selfie was taken. Rohit scored his first half-century in 25 innings during the IPL match against DC.",
        source_url:
          'https://www.youtube.com/watch?utm_campaign=fullarticle&v=zd_L_87rtu4&utm_medium=referral&utm_source=inshorts',
        source_name: 'YouTube',
        created_At: 1681302065000,
        categories: ['IPL_2023', 'sports'],
        bottom_headline: 'MI beat DC by 6 wickets in the IPL 2023 match',
        bottom_text: 'Tap to know more',
        bottom_link:
          'https://www.youtube.com/watch?utm_campaign=fullarticle&v=zd_L_87rtu4&utm_medium=referral&utm_source=inshorts',
        byline: 'video at YouTube / ',
      },
    ],
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
