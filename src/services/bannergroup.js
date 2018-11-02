import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryBannerGroup(params) {
  return request(`/api/bannergroup?${stringify(params)}`);
}

export async function addBannerGroup(params) {
  return request('/api/bannergroup/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateBannerGroup(params) {
  return request('/api/bannergroup/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function deleteBannerGroup(params) {
  return request('/api/bannergroup/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableBannerGroup(params) {
  return request('/api/bannergroup/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}