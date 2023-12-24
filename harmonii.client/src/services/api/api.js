import axios from 'axios';

const instance = axios.create({
  baseURL: "https://localhost:7291/api"
});
instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('user'))
    ?.token.result.jwt;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
