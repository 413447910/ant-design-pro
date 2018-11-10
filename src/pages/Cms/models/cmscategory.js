import {queryCmsCategory, updateCmsCategory, destroyCmsCategory , storeCmsCategory, enableCmsCategory} from '@/services/cmscategory';
import {checkRespData} from '@/utils/BdHelper';

export default {
  namespace: 'cmscategory',

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
      const response = yield call(queryCmsCategory, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *store({ payload, callback }, { call, put }) {
      const response = yield call(storeCmsCategory, payload);
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
      const response = yield call(destroyCmsCategory , payload);

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
      const response = yield call(updateCmsCategory, payload);

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
      const response = yield call(enableCmsCategory, payload);

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
