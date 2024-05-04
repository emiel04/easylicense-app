import axios, {AxiosError} from "axios";
import router from "@/router";
import type {App} from "vue";
import {addExtensions} from "./extensions";
export const API_URL = "https://easylicense.test/api/";

export const configureVue = (app: App<Element>) => {
    addExtensions();
}

export const http = axios.create({
    baseURL: API_URL,
    headers: {'Accept': 'application/json'},
    withCredentials: true
});

export const guestHttp = axios.create({
    baseURL: API_URL,
    headers: {'Accept': 'application/json'},
    withCredentials: true
});

let retryCount = 0;

http.interceptors.request.use(
    request => {
        request.headers['Accept-Language'] = localStorage.getItem('lang') ?? navigator.language;
        return request;
    }
);

http.interceptors.response.use(
    response => {
        retryCount = 0;
        return response;
    },
    async (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            if (retryCount < 3){
                retryCount++;
                const success = await refresh();
                if (success) {
                    return http.request(error.response.config);
                }
            }
            retryCount = 0;
            await router.push({name: 'login'});
        }
        return Promise.reject(error);
    }
);

async function refresh() {
    const response = await http.post(API_URL + 'auth/refresh').catch(() => routeToLogin());
    return response?.status === 200;
}

async function routeToLogin(){
    await router.push({name: 'login'});
}

