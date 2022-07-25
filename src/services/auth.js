import { del, get, post, put } from '../utils/request';

// 登录
export const LoginAPI = (data) => post('/api/v1/auth/manager_login', data);

// 商品
export const ProductsAPI = (page = 1) => get('/api/v1/admin/product', { page });

// 删除商品
export const DeleteAPI = (id, data) => del('/api/v1/admin/product/' + id, data);

// 新增商品
export const GetProductAPI = (data) => post('/api/v1/admin/product', data);

// 修改商品名称
export const AmendProductAPI = (data) => put('/api/v1/admin/product/' + data);

// 修改商品名称
export const UploadModalAPI = (id, data) => put('/api/v1/admin/product/' + id, data);

