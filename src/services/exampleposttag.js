import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryExamplePostTag(params) {
  return request(`/api/example/post/tag/index?${stringify(params)}`);
}

export async function storeExamplePostTag(params) {
  return request('/api/example/post/tag/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateExamplePostTag(params) {
  return request('/api/example/post/tag/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyExamplePostTag(params) {
  return request('/api/example/post/tag/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableExamplePostTag(params) {
  return request('/api/example/post/tag/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}