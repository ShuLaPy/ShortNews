import axios from 'axios';

const fetchShorts = async (category) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://short-news-api.herokuapp.com/shorts?category=${category}`)
      .then((response) => {
        console.log('Resopnse from fetch : ', response.data);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export {fetchShorts};
