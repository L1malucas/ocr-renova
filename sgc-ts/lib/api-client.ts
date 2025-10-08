import { HttpClient } from './http-client';

// These functions would be in a file like 'lib/auth.ts' or similar
const getToken = (): string | null => {
  // In a real app, you'd get this from localStorage, cookies, or state management
  return localStorage.getItem('authToken');
};

const removeToken = () => {
  localStorage.removeItem('authToken');
};

// Create the API client instance
// The toast logic is now handled by the interceptors within HttpClient itself
const apiClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  getToken,
  onUnauthorized: () => {
    removeToken();
    // Redirect to login, but in a decoupled way
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
});

export default apiClient;
