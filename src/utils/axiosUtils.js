import axios from "axios";
import { userBaseUrl, adminBaseUrl,apiBaseUrl } from "../constants/constants";

const createAxiosClient = (baseURL) => {
    const client = axios.create({
        baseURL,
        timeout: 10000,
        timeoutErrorMessage: "Request timeout Please Try Again!!!",
    });
    return client;
};

const attachToken = (req, tokenName) => {
    let authToken = localStorage.getItem(tokenName);
    if (authToken) {
        req.headers.Authorization = `Bearer ${authToken}`;
    }
    return req;
};

const baseAxiosInstance = createAxiosClient(apiBaseUrl);
baseAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, "adminJwt");
    return req
});

const userAxiosInstance = createAxiosClient(userBaseUrl);
userAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, "userJwt");
    return modifiedReq;
});

const adminAxiosInstance = createAxiosClient(adminBaseUrl);
adminAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, "adminJwt");
    return modifiedReq;
});

export { userAxiosInstance, baseAxiosInstance, adminAxiosInstance };