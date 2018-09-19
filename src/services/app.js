import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryApp(params) {
  return request(`/api/app?${stringify(params)}`);
}

export async function addApp(params) {
  return request('/api/app/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateApp(params) {
  return request('/api/app/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function deleteApp(params) {
  return request('/api/app/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableApp(params) {
  return request('/api/app/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}