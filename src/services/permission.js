import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryPermission(params) {
  return request(`/api/permissions/index?${stringify(params)}`);
}

export async function storePermission(params) {
  return request('/api/permissions/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updatePermission(params) {
  return request('/api/permissions/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyPermission(params) {
  return request('/api/permissions/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enablePermission(params) {
  return request('/api/permissions/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}