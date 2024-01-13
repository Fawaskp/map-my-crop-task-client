import axios from "axios";
import { userBaseUrl, adminBaseUrl,apiBaseUrl } from "../constants/constants";
import { getToken } from "@/utils/serverCookie";


const createAxiosClient = (baseURL) => {
    const client = axios.create({
        baseURL,
        timeout: 10000,
        timeoutErrorMessage: "Request timeout Please Try Again!!!",
    });
    return client;
};

const attachToken = async (req, tokenName) => {
    let authToken = await getToken(tokenName);
    // console.log('Token -> ',authToken);
    if (authToken!=undefined) {
        req.headers.Authorization = `Bearer ${authToken}`;
        // console.log('Modified Requset -> ',req);
    }
    return req;
};

const userBaseAxiosInstance = createAxiosClient(apiBaseUrl);
userBaseAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = await attachToken(req, "userJwt");
    return req
});

const adminBaseAxiosInstance = createAxiosClient(apiBaseUrl);
adminBaseAxiosInstance.interceptors.request.use(async (req) => {
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

export { userAxiosInstance, adminBaseAxiosInstance,userBaseAxiosInstance, adminAxiosInstance };