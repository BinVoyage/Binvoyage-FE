import axios from 'axios';

const api = axios.create({
  baseURL: 'https://binvoyage.net/api', // 기본 API URL을 설정하세요.
  timeout: 10000, // 요청 시간 초과 설정 (ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;