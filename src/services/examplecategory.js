import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryExampleCategory(params) {
  return request(`/api/example/category/index?${stringify(params)}`);
}

export async function storeExampleCategory(params) {
  return request('/api/example/category/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateExampleCategory(params) {
  return request('/api/example/category/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyExampleCategory(params) {
  return request('/api/example/category/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableExampleCategory(params) {
  return request('/api/example/category/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}