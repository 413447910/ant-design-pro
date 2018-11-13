import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryExamplePostCategory(params) {
  return request(`/api/example/post/category/index?${stringify(params)}`);
}

export async function storeExamplePostCategory(params) {
  return request('/api/example/post/category/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateExamplePostCategory(params) {
  return request('/api/example/post/category/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyExamplePostCategory(params) {
  return request('/api/example/post/category/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableExamplePostCategory(params) {
  return request('/api/example/post/category/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}