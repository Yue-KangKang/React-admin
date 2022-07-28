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

//根路径
export const serverURL = 'http://localhost:1337';

// 图片上传路径
export const UploadUrl = serverURL + '/api/v1/common/upload_file';

// 处理图片路径问题
export function resetImgUrl(url) {
    if (url) {
        if (url.startsWith('http')) {
            return url;
        }
        return serverURL + url;
    } else {
        return 'https://tse4-mm.cn.bing.net/th/id/OIP-C.X-VG5gTN2ak8rGRij3oCogAAAA?w=173&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7'
    }
};