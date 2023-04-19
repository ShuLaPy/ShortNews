import axios from 'axios';

const fetchShorts = async (category, language = 'en') => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://shortnews.onrender.com/shorts?category=${category}&lang=${language}`,
      )
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export {fetchShorts};
