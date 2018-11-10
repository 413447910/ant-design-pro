import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryCmsPost(params) {
  return request(`/api/cms/post/index?${stringify(params)}`);
}

export async function storeCmsPost(params) {
  return request('/api/cms/post/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateCmsPost(params) {
  return request('/api/cms/post/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyCmsPost(params) {
  return request('/api/cms/post/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableCmsPost(params) {
  return request('/api/cms/post/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}