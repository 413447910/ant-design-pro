import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryCmsProduct(params) {
  return request(`/api/cms/product/index?${stringify(params)}`);
}

export async function storeCmsProduct(params) {
  return request('/api/cms/product/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateCmsProduct(params) {
  return request('/api/cms/product/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyCmsProduct(params) {
  return request('/api/cms/product/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableCmsProduct(params) {
  return request('/api/cms/product/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}