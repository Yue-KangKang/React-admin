import { del, get, post, put } from '../utils/request';

// 登录
export const LoginAPI = (data) => post('/api/v1/auth/manager_login', data);

// 商品 query为商品名称，根据商品名称进行搜索
export const ProductsAPI = (page = 1, query = {}) => get('/api/v1/admin/product', { page, ...query });

// 删除商品
export const DeleteAPI = (id, data) => del('/api/v1/admin/product/' + id, data);

// 新增商品
export const GetProductAPI = (data) => post('/api/v1/admin/product', data);

// 修改商品名称
export const AmendProductAPI = (data) => put('/api/v1/admin/product/' + data);

// 修改商品信息
export const UploadModalAPI = (id, data) => put('/api/v1/admin/product/' + id, data);

// 新增轮播图列表
export const BannerAPI = (page = 1, query = {}) => get('/api/v1/admin/banner', { page, ...query });

// 新增轮播图
export const NewBannerAPI = (data) => post('/api/v1/admin/banner', data);

// 修改轮播图信息
export const UploadBannerAPI = (id, data) => put('/api/v1/admin/banner/' + id, data);

// 删除轮播图信息
export const DeleteBannerAPI = (id, data) => del('/api/v1/admin/banner/' + id, data);

