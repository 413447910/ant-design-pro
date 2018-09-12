import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryComponent(params) {
  return request(`/api/component?${stringify(params)}`);
}

export async function addComponent(params) {
  return request('/api/component/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateComponent(params) {
  return request('/api/component/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function deleteComponent(params) {
  return request('/api/component/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}