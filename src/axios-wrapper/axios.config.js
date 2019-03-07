import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:'http://localhost:80'
  // baseURL: 'https://ice-cream-service.herokuapp.com/'
});
