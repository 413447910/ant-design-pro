import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryCmsScrapy(params) {
  return request(`/api/cms/scrapy/index?${stringify(params)}`);
}

export async function storeCmsScrapy(params) {
  return request('/api/cms/scrapy/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateCmsScrapy(params) {
  return request('/api/cms/scrapy/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function destroyCmsScrapy(params) {
  return request('/api/cms/scrapy/destroy', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function enableCmsScrapy(params) {
  return request('/api/cms/scrapy/enable', {
    method: 'POST',
    body: {
      ...params,
      method: 'enable',
    },
  });
}

export async function freshCmsScrapy(params) {
  return request(`/api/cms/scrapy/fresh?${stringify(params)}`);
}
