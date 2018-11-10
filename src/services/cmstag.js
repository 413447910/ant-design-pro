import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryCmsTag(params) {
  return request(`/api/cms/tag/index?${stringify(params)}`);
}

export async function storeCmsTag(params) {
  return request('/api/cms/tag/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateCmsTag(params) {
  return request('/api/cms/tag/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyCmsTag(params) {
  return request('/api/cms/tag/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableCmsTag(params) {
  return request('/api/cms/tag/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}