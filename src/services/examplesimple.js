import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryExampleSimple(params) {
  return request(`/api/example/simple/index?${stringify(params)}`);
}

export async function storeExampleSimple(params) {
  return request('/api/example/simple/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateExampleSimple(params) {
  return request('/api/example/simple/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyExampleSimple(params) {
  return request('/api/example/simple/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableExampleSimple(params) {
  return request('/api/example/simple/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}