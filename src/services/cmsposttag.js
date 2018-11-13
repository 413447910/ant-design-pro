import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryCmsPostTag(params) {
  return request(`/api/cms/post/tag/index?${stringify(params)}`);
}

export async function storeCmsPostTag(params) {
  return request('/api/cms/post/tag/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateCmsPostTag(params) {
  return request('/api/cms/post/tag/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyCmsPostTag(params) {
  return request('/api/cms/post/tag/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableCmsPostTag(params) {
  return request('/api/cms/post/tag/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}