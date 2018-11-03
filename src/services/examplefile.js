import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryExampleFile(params) {
  return request(`/api/example/file/index?${stringify(params)}`);
}

export async function storeExampleFile(params) {
  return request('/api/example/file/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateExampleFile(params) {
  return request('/api/example/file/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyExampleFile(params) {
  return request('/api/example/file/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableExampleFile(params) {
  return request('/api/example/file/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}