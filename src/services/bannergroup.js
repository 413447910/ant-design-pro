import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryBannerGroup(params) {
  return request(`/api/banner/group/index?${stringify(params)}`);
}

export async function storeBannerGroup(params) {
  return request('/api/banner/group/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateBannerGroup(params) {
  return request('/api/banner/group/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyBannerGroup(params) {
  return request('/api/banner/group/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableBannerGroup(params) {
  return request('/api/banner/group/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}