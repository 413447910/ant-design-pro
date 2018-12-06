import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryGeneratorStar(params) {
  return request(`/api/generator/star/index?${stringify(params)}`);
}

export async function storeGeneratorStar(params) {
  return request('/api/generator/star/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateGeneratorStar(params) {
  return request('/api/generator/star/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyGeneratorStar(params) {
  return request('/api/generator/star/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableGeneratorStar(params) {
  return request('/api/generator/star/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}