import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryExampleBasic(params) {
  return request(`/api/example/basic/index?${stringify(params)}`);
}

export async function storeExampleBasic(params) {
  return request('/api/example/basic/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateExampleBasic(params) {
  return request('/api/example/basic/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyExampleBasic(params) {
  return request('/api/example/basic/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableExampleBasic(params) {
  return request('/api/example/basic/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}