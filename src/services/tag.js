import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryTag(params) {
  return request(`/api/tag?${stringify(params)}`);
}

export async function addTag(params) {
  return request('/api/tag/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateTag(params) {
  return request('/api/tag/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function deleteTag(params) {
  return request('/api/tag/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableTag(params) {
  return request('/api/tag/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}