/* eslint-disable prettier/prettier */
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://binvoyage.net/api',
});

export default api;
