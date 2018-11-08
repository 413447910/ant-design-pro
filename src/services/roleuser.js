import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryRoleUser(params) {
  return request(`/api/roles/user/index?${stringify(params)}`);
}

export async function storeRoleUser(params) {
  return request('/api/roles/user/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateRoleUser(params) {
  return request('/api/roles/user/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyRoleUser(params) {
  return request('/api/roles/user/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableRoleUser(params) {
  return request('/api/roles/user/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}