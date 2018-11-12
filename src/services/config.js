import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryConfig(params) {
  return request(`/api/config/index?${stringify(params)}`);
}

export async function storeConfig(params) {
  return request('/api/config/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateConfig(params) {
  return request('/api/config/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyConfig(params) {
  return request('/api/config/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableConfig(params) {
  return request('/api/config/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}