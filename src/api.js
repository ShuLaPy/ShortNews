import axios from 'axios';

const fetchShorts = async (category) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://192.168.0.131:3000/shorts?category=${category}`)
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
