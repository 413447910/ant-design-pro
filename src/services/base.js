import request from '@/utils/request';
import { stringify } from 'qs';


export async function addEffective(params) {
  return request('/api/effective/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}


export async function queryComponent(params) {
  return request(`/api/component?${stringify(params)}`);
}

export async function addComponent(params) {
  return request('/api/component', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateComponent(params) {
  return request('/api/component', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function removeComponent(params) {
  return request('/api/component', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}