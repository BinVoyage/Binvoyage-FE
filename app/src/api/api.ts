/* eslint-disable prettier/prettier */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.37.135.150:8000',
});

export default api;
