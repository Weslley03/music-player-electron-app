import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const apiLocal = axios.create({
  baseURL: 'http://localhost:8080',
});

export default api;
