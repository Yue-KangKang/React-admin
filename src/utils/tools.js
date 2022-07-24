export function setToken(token) {
    return sessionStorage.setItem('token', token);
} // 存

export function getToken() {
    return sessionStorage.getItem('token');
} // 取

export function removeToken() {
    return sessionStorage.removeItem('token');
} // 删

export function isLogin() {
    return getToken() ? true : false;
} // 判断是否登录

export const serverURL = 'http://localhost:1337'