import axios from 'axios';

const http = axios.create({
    baseURL: 'https://platformaspedytor8-back-production.up.railway.app',
    withCredentials: true, // for /refresh via httpOnly cookie
});

let accessToken = null;
export const setAccessToken = (t) => { accessToken = t; };
export const getAccessToken = () => accessToken;

http.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

let isRefreshing = false;
let queue = [];

http.interceptors.response.use(
    (res) => res,
    async (err) => {
        const original = err.config || {};
        if (err.response && err.response.status === 401 && !original._retry) {
            original._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    queue.push((t) => {
                        if (!t) return reject(err);
                        original.headers = original.headers || {};
                        original.headers.Authorization = `Bearer ${t}`;
                        resolve(http(original));
                    });
                });
            }

            try {
                isRefreshing = true;
                const { data } = await http.post('/refresh'); // server reads cookie
                const t = data && data.accessToken ? data.accessToken : null;
                setAccessToken(t);
                queue.forEach((fn) => fn(t));
                queue = [];
                if (t) {
                    original.headers = original.headers || {};
                    original.headers.Authorization = `Bearer ${t}`;
                    return http(original);
                }
            } catch (e) {
                setAccessToken(null);
                queue.forEach((fn) => fn(null));
                queue = [];
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(err);
    }
);

export default http;
