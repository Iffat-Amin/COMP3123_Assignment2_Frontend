import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your backend base URL
});

// Add a token to the headers if it's available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
