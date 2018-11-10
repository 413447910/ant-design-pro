import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryCmsCategory(params) {
  return request(`/api/cms/category/index?${stringify(params)}`);
}

export async function storeCmsCategory(params) {
  return request('/api/cms/category/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateCmsCategory(params) {
  return request('/api/cms/category/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyCmsCategory(params) {
  return request('/api/cms/category/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableCmsCategory(params) {
  return request('/api/cms/category/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}