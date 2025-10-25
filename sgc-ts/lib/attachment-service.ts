import {
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';
import type { ApiResponse } from './types';

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

export class AttachmentService {
  private readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  public async post<T>(url: string, data?: any, config?: CustomRequestConfig): Promise<ApiResponse<T>> {
    const formData = this.createFormData(data, config?.attachments);
    const response = await this.client.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: CustomRequestConfig): Promise<ApiResponse<T>> {
    const formData = this.createFormData(data, config?.attachments);
    const response = await this.client.put<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: CustomRequestConfig): Promise<ApiResponse<T>> {
    const formData = this.createFormData(data, config?.attachments);
    const response = await this.client.patch<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  private createFormData(data?: any, attachments?: File[]): FormData {
    const formData = new FormData();

    if (data) {
      formData.append('data', JSON.stringify(data));
    }

    if (attachments) {
      attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }

    return formData;
  }
}
