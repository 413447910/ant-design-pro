import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryNav(params) {
  return request(`/api/nav/index?${stringify(params)}`);
}

export async function storeNav(params) {
  return request('/api/nav/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateNav(params) {
  return request('/api/nav/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyNav(params) {
  return request('/api/nav/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableNav(params) {
  return request('/api/nav/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}