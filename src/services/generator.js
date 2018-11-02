import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryGenerator(params) {
  return request(`/api/generator/index?${stringify(params)}`);
}

export async function storeGenerator(params) {
  return request('/api/generator/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateGenerator(params) {
  return request('/api/generator/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyGenerator(params) {
  return request('/api/generator/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableGenerator(params) {
  return request('/api/generator/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}