import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryComponent(params) {
  return request(`/api/component/index?${stringify(params)}`);
}

export async function storeComponent(params) {
  return request('/api/component/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateComponent(params) {
  return request('/api/component/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyComponent(params) {
  return request('/api/component/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableComponent(params) {
  return request('/api/component/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}