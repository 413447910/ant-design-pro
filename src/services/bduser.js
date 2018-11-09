import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryBdUser(params) {
  return request(`/api/users/index?${stringify(params)}`);
}

export async function storeBdUser(params) {
  return request('/api/users/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateBdUser(params) {
  return request('/api/users/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyBdUser(params) {
  return request('/api/users/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableBdUser(params) {
  return request('/api/users/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}