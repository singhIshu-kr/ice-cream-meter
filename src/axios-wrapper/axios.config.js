import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://ice-cream-service.herokuapp.com/'
});
  // baseURL:'http://localhost:8008'
