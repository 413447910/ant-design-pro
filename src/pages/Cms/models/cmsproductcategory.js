import {queryCmsProductCategory, updateCmsProductCategory, destroyCmsProductCategory , storeCmsProductCategory, enableCmsProductCategory} from '@/services/cmsproductcategory';
import {checkRespData} from '@/utils/BdHelper';

export default {
  namespace: 'cmsproductcategory',

  state: {
    data: {
      list: [],
      pagination: {},
      treeData: [],
      common: [],
    },
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryCmsProductCategory, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *store({ payload, callback }, { call, put }) {
      const response = yield call(storeCmsProductCategory, payload);
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
      const response = yield call(destroyCmsProductCategory , payload);

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
      const response = yield call(updateCmsProductCategory, payload);

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
      const response = yield call(enableCmsProductCategory, payload);

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
