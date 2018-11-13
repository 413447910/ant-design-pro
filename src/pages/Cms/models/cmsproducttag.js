import {queryCmsProductTag, updateCmsProductTag, destroyCmsProductTag , storeCmsProductTag, enableCmsProductTag} from '@/services/cmsproducttag';
import {checkRespData} from '@/utils/BdHelper';

export default {
  namespace: 'cmsproducttag',

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
      const response = yield call(queryCmsProductTag, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *store({ payload, callback }, { call, put }) {
      const response = yield call(storeCmsProductTag, payload);
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
      const response = yield call(destroyCmsProductTag , payload);

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
      const response = yield call(updateCmsProductTag, payload);

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
      const response = yield call(enableCmsProductTag, payload);

      if(!checkRespData(response, 'enable')){
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
