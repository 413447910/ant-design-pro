import {queryCmsScrapy, updateCmsScrapy, destroyCmsScrapy , storeCmsScrapy, enableCmsScrapy,
  freshCmsScrapy } from '@/services/cmsscrapy';
import {checkRespData} from '@/utils/BdHelper';

export default {
  namespace: 'cmsscrapy',

  state: {
    data: {
      list: [],
      pagination: {},
      treeData: [],
      common: [],
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryCmsScrapy, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *store({ payload, callback }, { call, put }) {
      const response = yield call(storeCmsScrapy, payload);
      if(!checkRespData(response, 'store')){
        return;
      }
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *destroy({ payload, callback }, { call, put }) {
      const response = yield call(destroyCmsScrapy , payload);

      if(!checkRespData(response, 'destroy')){
        return;
      }

      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateCmsScrapy, payload);

      if(!checkRespData(response, 'update')){
        return;
      }

      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *enable({ payload, callback }, { call, put }) {
      const response = yield call(enableCmsScrapy, payload);

      if(!checkRespData(response, 'enable')){
        return;
      }

      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *fresh({ payload, callback }, { call, put }) {
      const response = yield call(freshCmsScrapy, payload);

      if(!checkRespData(response, 'fresh')){
        return;
      }

      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload.data,
      };
    },
  },
};
