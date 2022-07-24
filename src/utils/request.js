import axios from 'axios';
import { serverURL, getToken } from './tools';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
export const instance = axios.create({
    baseURL: serverURL, // 请求接口的根路径
    timeout: 5000, // 超时时间
});

instance.interceptors.request.use(
    function (config) {
        config.headers.token = getToken(); //设置请求头中的token
        Nprogress.start();
        return config;
    }, function (error) {
        Nprogress.start();
        return Promise.reject(error);
    });

instance.interceptors.response.use(function (response) {
    Nprogress.done();
    return response.data;
}, function (error) {
    Nprogress.done();
    return Promise.reject(error);
});

// get请求
export const get = (url, params) => instance.get(url, { params });

// post请求
export const post = (url, data) => instance.post(url, data);

// put请求
export const put = (url, data) => instance.put(url, data);

// delete请求
export const del = (url) => instance.delete(url);

