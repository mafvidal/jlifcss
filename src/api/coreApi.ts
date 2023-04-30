import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {ApiCoreResponse, StatusResponse} from "./coreApiResponses";

const coreApi = axios.create({
    baseURL: "https://julifapi-production.up.railway.app/api"
})

coreApi.interceptors.request.use( config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = {
            ...config.headers,
            token
        };
    }
    return config;
})

const handleRequest = async (request: Promise<AxiosResponse>) => {
    try {
        const response = await request;
        return response.data;
    } catch (e: any) {
        if (e.response.status === 401) {
            localStorage.removeItem('token');
        }
        return {
            status: StatusResponse.ERROR,
            error: {
                errorCode: e.response.statusText,
                message: "Error de conexión"
            }
        }
    }
}

export class CoreApi {
    static async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<ApiCoreResponse<T>> {
        return handleRequest(coreApi.post<ApiCoreResponse<T>>(url, data, config));
    }

    static async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<ApiCoreResponse<T>> {
        return handleRequest(coreApi.put<ApiCoreResponse<T>>(url, data, config));
    }

    static async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiCoreResponse<T>> {
        return handleRequest(coreApi.get<ApiCoreResponse<T>>(url, config));
    }

    static async patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<ApiCoreResponse<T>> {
        return handleRequest(coreApi.patch<ApiCoreResponse<T>>(url, data, config));
    }

    static async delete<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<ApiCoreResponse<T>> {
        return handleRequest(coreApi.delete<ApiCoreResponse<T>>(url, config));
    }
}
