import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryBanner(params) {
  return request(`/api/banner?${stringify(params)}`);
}

export async function addBanner(params) {
  return request('/api/banner/add', {
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

export async function deleteBanner(params) {
  return request('/api/banner/delete', {
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

// subset

export async function queryBannerSubset(params) {
  return request(`/api/bannerSubset?${stringify(params)}`);
}


export async function addBannerSubset(params) {
  return request('/api/bannerSubset/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateBannerSubset(params) {
  return request('/api/bannerSubset/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}


export async function deleteBannerSubset(params) {
  return request('/api/bannerSubset/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableBannerSubset(params) {
  return request('/api/bannerSubset/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}