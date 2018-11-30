import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:'http://localhost:8008'
  // baseURL: 'https://ice-cream-service.herokuapp.com/'
});
