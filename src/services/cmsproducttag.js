import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryCmsProductTag(params) {
  return request(`/api/cms/product/tag/index?${stringify(params)}`);
}

export async function storeCmsProductTag(params) {
  return request('/api/cms/product/tag/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateCmsProductTag(params) {
  return request('/api/cms/product/tag/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyCmsProductTag(params) {
  return request('/api/cms/product/tag/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableCmsProductTag(params) {
  return request('/api/cms/product/tag/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}