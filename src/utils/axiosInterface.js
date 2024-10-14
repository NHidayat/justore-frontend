import axios from 'axios';

console.log(process.env.REACT_APP_API_BASE_URL);

const axiosInterface = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

axiosInterface.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosInterface.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInterface;
