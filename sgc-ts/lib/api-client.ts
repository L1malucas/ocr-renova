import { HttpClient } from './http-client';
import { toast } from '@/hooks/use-toast'; // Corrected import path

// These functions would be in a file like 'lib/auth.ts' or similar
const getToken = (): string | null => {
  // In a real app, you'd get this from localStorage, cookies, or state management
  return localStorage.getItem('authToken');
};

const removeToken = () => {
  localStorage.removeItem('authToken');
};

// Create the API client instance
const apiClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api', // Example URL
  getToken,
  onUnauthorized: () => {
    removeToken();
    // Redirect to login, but in a decoupled way
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
  onSuccess: (response) => {
    // You could show a success toast for certain methods if you want
    const method = response.config.method?.toUpperCase();
    if (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
      toast({
        title: "Sucesso!",
        description: "Sua requisição foi processada com sucesso.",
      });
    }
  },
  onError: (error) => {
    let message = 'Ocorreu um erro inesperado.';
    if (error.code === 'ECONNABORTED') {
      message = 'A requisição demorou muito para responder.';
    } else if (error.response) {
      const responseData = error.response.data as { message?: string; error?: string };
      message = responseData?.message || responseData?.error || `Erro na requisição: ${error.response.status}`;
    }
    
    toast({
      title: "Erro na Requisição",
      description: message,
      variant: "destructive",
    });
  },
});

export default apiClient;
