import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryPermissionGroup(params) {
  return request(`/api/permissions/group/index?${stringify(params)}`);
}

export async function storePermissionGroup(params) {
  return request('/api/permissions/group/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updatePermissionGroup(params) {
  return request('/api/permissions/group/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyPermissionGroup(params) {
  return request('/api/permissions/group/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enablePermissionGroup(params) {
  return request('/api/permissions/group/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}