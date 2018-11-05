import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryMenu(params) {
  return request(`/api/menu/index?${stringify(params)}`);
}

export async function storeMenu(params) {
  return request('/api/menu/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateMenu(params) {
  return request('/api/menu/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyMenu(params) {
  return request('/api/menu/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableMenu(params) {
  return request('/api/menu/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}