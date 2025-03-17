import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://apidoc.rheel.ng/',
  timeout: 1000000, 
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    console.error('API Error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;