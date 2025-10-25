import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';
import { toast } from '@/components/ui/use-toast';
import type { ApiResponse, PaginatedApiResponse } from './types';
import { AttachmentService } from './attachment-service';

// Custom request config to allow passing extra parameters
export interface CustomRequestConfig extends AxiosRequestConfig {
  successMessage?: string;
  attachments?: File[];
}

export interface HttpClientConfig {
  baseURL: string;
  timeout?: number;
  getToken?: () => string | null;
  onUnauthorized?: () => void;
}

export class HttpClient {
  public readonly baseURL: string;
  private readonly instance: AxiosInstance;
  private readonly attachmentService: AttachmentService;

  constructor(config: HttpClientConfig) {
    this.baseURL = config.baseURL;
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.attachmentService = new AttachmentService(this.instance);

    this.setupInterceptors(config);
  }

  private setupInterceptors(config: HttpClientConfig): void {
    this.instance.interceptors.request.use(
      (axiosConfig: InternalAxiosRequestConfig) => {
        if (config.getToken) {
          const token = config.getToken();
          if (token) {
            axiosConfig.headers.Authorization = `Bearer ${token}`;
          }
        }
        return axiosConfig;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse<any> | PaginatedApiResponse<any>>) => {
        const responseData = response.data;
        const customConfig = response.config as CustomRequestConfig;

        if (responseData.success) {
          toast({
            title: `Sucesso (${response.status})`,
            description: responseData.messages?.[0] || customConfig.successMessage || 'Operação bem-sucedida.',
          });
        }

        return response;
      },
      (error: AxiosError<ApiResponse<any>>) => {
        const { response } = error;

        if (response?.status === 401 && config.onUnauthorized) {
          config.onUnauthorized();
        }

        toast({
          title: `Erro (${response?.status || 'Sem resposta'})`,
          description: response?.data?.messages?.[0] || error.message || 'Ocorreu um erro inesperado.',
          variant: 'destructive',
        });

        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: CustomRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  public async getPaginated<T>(url: string, config?: CustomRequestConfig): Promise<PaginatedApiResponse<T>> {
    const response = await this.instance.get<PaginatedApiResponse<T>>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: CustomRequestConfig): Promise<ApiResponse<T>> {
    if (config?.attachments) {
      return this.attachmentService.post<T>(url, data, config);
    }
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: CustomRequestConfig): Promise<ApiResponse<T>> {
    if (config?.attachments) {
      return this.attachmentService.put<T>(url, data, config);
    }
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: CustomRequestConfig): Promise<ApiResponse<T>> {
    if (config?.attachments) {
      return this.attachmentService.patch<T>(url, data, config);
    }
    const response = await this.instance.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: CustomRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }
}