import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryExampleGroup(params) {
  return request(`/api/example/group/index?${stringify(params)}`);
}

export async function storeExampleGroup(params) {
  return request('/api/example/group/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateExampleGroup(params) {
  return request('/api/example/group/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyExampleGroup(params) {
  return request('/api/example/group/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableExampleGroup(params) {
  return request('/api/example/group/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}