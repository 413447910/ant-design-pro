import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryCategory(params) {
  return request(`/api/category?${stringify(params)}`);
}

export async function addCategory(params) {
  return request('/api/category/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateCategory(params) {
  return request('/api/category/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function deleteCategory(params) {
  return request('/api/category/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableCategory(params) {
  return request('/api/category/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}