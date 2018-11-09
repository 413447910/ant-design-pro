import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryBanner(params) {
  return request(`/api/banner/index?${stringify(params)}`);
}

export async function storeBanner(params) {
  return request('/api/banner/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateBanner(params) {
  return request('/api/banner/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyBanner(params) {
  return request('/api/banner/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableBanner(params) {
  return request('/api/banner/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}