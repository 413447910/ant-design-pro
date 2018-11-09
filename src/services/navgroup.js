import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryNavGroup(params) {
  return request(`/api/nav/group/index?${stringify(params)}`);
}

export async function storeNavGroup(params) {
  return request('/api/nav/group/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateNavGroup(params) {
  return request('/api/nav/group/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyNavGroup(params) {
  return request('/api/nav/group/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableNavGroup(params) {
  return request('/api/nav/group/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}