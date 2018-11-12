import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryConfigGroup(params) {
  return request(`/api/config/group/index?${stringify(params)}`);
}

export async function storeConfigGroup(params) {
  return request('/api/config/group/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateConfigGroup(params) {
  return request('/api/config/group/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyConfigGroup(params) {
  return request('/api/config/group/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableConfigGroup(params) {
  return request('/api/config/group/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}