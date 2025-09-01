import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to: ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`Response received: ${response.status} ${response.statusText}`);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);

    if (error.response?.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: (userId) => api.post('/auth/me', { userId }),
};

export default api;
