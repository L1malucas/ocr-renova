import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';

// Define a standard response format for our client
export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  message?: string;
}

// Define the configuration for the client
export interface HttpClientConfig {
  baseURL: string;
  timeout?: number;
  getToken?: () => string | null;
  onUnauthorized?: () => void;
  onRequest?: (config: AxiosRequestConfig) => void;
  onSuccess?: (response: AxiosResponse) => void;
  onError?: (error: AxiosError) => void;
}

export class HttpClient {
  private readonly instance: AxiosInstance;
  private readonly config: HttpClientConfig;

  constructor(config: HttpClientConfig) {
    this.config = config;
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config) => {
        if (this.config.getToken) {
          const token = this.config.getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        this.config.onRequest?.(config);
        return config;
      },
      (error) => {
        this.config.onError?.(error as AxiosError);
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        this.config.onSuccess?.(response);
        return response;
      },
      (error: AxiosError) => {
        const { response } = error;
        if (response?.status === 401 && this.config.onUnauthorized) {
          this.config.onUnauthorized();
        }
        this.config.onError?.(error);
        return Promise.reject(error);
      }
    );
  }

  private async handleRequest<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.request<T>(config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let message = 'Erro de conexão com o servidor.';
        if (error.code === 'ECONNABORTED') {
          message = 'A requisição excedeu o tempo limite. Por favor, tente novamente.';
        } else if (error.response) {
          const responseData = error.response.data as { message?: string; error?: string };
          message = responseData?.message || responseData?.error || `Erro na requisição: ${error.response.status}`;
        }
        return {
          success: false,
          data: null,
          message,
        };
      }
      return {
        success: false,
        data: null,
        message: 'Erro inesperado ao processar a requisição.',
      };
    }
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.handleRequest<T>({ ...config, method: 'GET', url });
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.handleRequest<T>({ ...config, method: 'POST', url, data });
  }

  public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.handleRequest<T>({ ...config, method: 'PUT', url, data });
  }

  public patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.handleRequest<T>({ ...config, method: 'PATCH', url, data });
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.handleRequest<T>({ ...config, method: 'DELETE', url });
  }
}
