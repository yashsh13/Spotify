import axios from "axios";
import useAuthStore from "../stores/authStore";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true
})

let isRefreshing: boolean = false;
let queue: {
    resolve: (token: string) => void,
    reject: (error: any) => void
}[] = [];

const resolveQueue = (newToken: string) => {
    queue.forEach(({ resolve }) => resolve(newToken));
    queue = [];
}

const rejectQueue = (error: any) => {
    queue.forEach(({ reject }) => reject(error));
    queue = [];
}

api.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config
})

api.interceptors.response.use((response) => response,
    async (error) => {
        const orignalRequest = error.config;
        if(error.response.status === 401 && !orignalRequest._retry && error.config.url !== '/api/v1/auth/login'){
            if(isRefreshing) {
                return new Promise((resolve,reject) => {
                    queue.push({ resolve, reject});
                }).then((newToken) => {
                    orignalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(orignalRequest)
                })
            }

            orignalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await axios.post(`${process.env.BASE_URL}/api/v1/auth/refresh`,
                    { headers: { withCredentials: true } }
                );
                useAuthStore.getState().setAccessToken(data.accessToken as string)

                const newToken = useAuthStore.getState().accessToken;
                resolveQueue(newToken as string);
                return api(orignalRequest);

            } catch (refreshError) {
                rejectQueue(refreshError);
                useAuthStore.getState().emptyStore();

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
)

export default api;