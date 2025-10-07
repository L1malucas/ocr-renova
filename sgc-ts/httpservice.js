import { axiosInstance, axiosGetToken, axiosRemoveToken } from '../api/api';
import axios from 'axios';
import { handleApiResponse } from '../utils/handleApiResponse';

class HttpService {
	constructor() {
		axiosInstance.defaults.timeout = 30000;
		this.setupInterceptors();
	}

	get defaultHeaders() {
		const token = axiosGetToken();
		return {
			Authorization: token ? `Bearer ${token}` : '',
			'Content-Type': 'application/json',
		};
	}

	setupInterceptors() {
		axiosInstance.interceptors.request.use(
			(config) => {
				config.headers = { ...config.headers, ...this.defaultHeaders };
				return config;
			},
			(error) => Promise.reject(error)
		);

		axiosInstance.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config;

				if (error.response?.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;
					axiosRemoveToken();
					window.location.href = '/login';
				}

				return Promise.reject(error);
			}
		);
	}

	async request(
		method,
		url,
		data = null,
		customHeaders = {},
		customTimeout = null
	) {
		const headers = { ...this.defaultHeaders, ...customHeaders };

		const config = {
			method,
			url,
			headers,
			timeout: customTimeout || axiosInstance.defaults.timeout,
		};

		if (data) {
			config.data = data;
		}

		try {
			const response = await axiosInstance(config);
			return handleApiResponse(response);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.code === 'ECONNABORTED') {
					return {
						message:
							'A requisição excedeu o tempo limite de 30 segundos. Por favor, tente novamente.',
						severity: 'error',
						data: null,
					};
				}
				if (error.response) {
					const { status, data: responseData } = error.response;
					return handleApiResponse({ status, data: responseData });
				}
				return {
					message: 'Erro de conexão com o servidor.',
					severity: 'error',
					data: null,
				};
			}
			return {
				message: 'Erro inesperado ao processar a requisição.',
				severity: 'error',
				data: null,
			};
		}
	}

	setDefaultTimeout(timeout) {
		axiosInstance.defaults.timeout = timeout;
	}

	get(url, customHeaders = {}, data = null, timeout = null) {
		return this.request('get', url, data, customHeaders, timeout);
	}

	post(url, data, customHeaders = {}, timeout = null) {
		return this.request('post', url, data, customHeaders, timeout);
	}

	put(url, data, customHeaders = {}, timeout = null) {
		return this.request('put', url, data, customHeaders, timeout);
	}

	delete(url, data = null, customHeaders = {}, timeout = null) {
		return this.request('delete', url, data, customHeaders, timeout);
	}
	patch(url, data, customHeaders = {}, timeout = null) {
		return this.request('patch', url, data, customHeaders, timeout);
	}

	setBaseUrl(newUrl) {
		axiosInstance.defaults.baseURL = newUrl;
	}
}

export default new HttpService();
