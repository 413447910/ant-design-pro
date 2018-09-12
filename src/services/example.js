import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryExample(params) {
  return request(`/api/example?${stringify(params)}`);
}

export async function addExample(params) {
  return request('/api/example/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateExample(params) {
  return request('/api/example/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function deleteExample(params) {
  return request('/api/example/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}