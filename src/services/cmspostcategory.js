import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryCmsPostCategory(params) {
  return request(`/api/cms/post/category/index?${stringify(params)}`);
}

export async function storeCmsPostCategory(params) {
  return request('/api/cms/post/category/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateCmsPostCategory(params) {
  return request('/api/cms/post/category/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyCmsPostCategory(params) {
  return request('/api/cms/post/category/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableCmsPostCategory(params) {
  return request('/api/cms/post/category/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}