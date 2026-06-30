import axios from 'axios';
import { storage, STORAGE_KEYS } from '../../utils/storage';
import type { AuthSession } from '../../types';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const session = storage.get<AuthSession>(STORAGE_KEYS.AUTH_SESSION);
  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.remove(STORAGE_KEYS.AUTH_SESSION);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
