import axios from 'axios';

const fetchShorts = async category => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://shortnews.onrender.com/shorts?category=${category}`)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export {fetchShorts};
