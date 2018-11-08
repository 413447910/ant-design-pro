import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryRole(params) {
  return request(`/api/roles/index?${stringify(params)}`);
}

export async function storeRole(params) {
  return request('/api/roles/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateRole(params) {
  return request('/api/roles/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyRole(params) {
  return request('/api/roles/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableRole(params) {
  return request('/api/roles/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}