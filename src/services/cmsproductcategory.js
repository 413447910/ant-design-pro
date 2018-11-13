import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryCmsProductCategory(params) {
  return request(`/api/cms/product/category/index?${stringify(params)}`);
}

export async function storeCmsProductCategory(params) {
  return request('/api/cms/product/category/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateCmsProductCategory(params) {
  return request('/api/cms/product/category/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyCmsProductCategory(params) {
  return request('/api/cms/product/category/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableCmsProductCategory(params) {
  return request('/api/cms/product/category/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}