import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryExamplePost(params) {
  return request(`/api/example/post/index?${stringify(params)}`);
}

export async function storeExamplePost(params) {
  return request('/api/example/post/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateExamplePost(params) {
  return request('/api/example/post/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyExamplePost(params) {
  return request('/api/example/post/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableExamplePost(params) {
  return request('/api/example/post/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}