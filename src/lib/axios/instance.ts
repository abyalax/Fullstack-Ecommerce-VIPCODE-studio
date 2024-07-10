import axios from "axios";

const Headers = {
    Accept: 'application/json',
    "Content-Type": "application/json",
    "Chace-Control": "no-cache",
    Expires:0,
};

const Instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: Headers,
    timeout: 60 * 1000,
});

Instance.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Instance.interceptors.request.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default Instance;