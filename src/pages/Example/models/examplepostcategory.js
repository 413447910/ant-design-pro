import {queryExamplePostCategory, updateExamplePostCategory, destroyExamplePostCategory , storeExamplePostCategory, enableExamplePostCategory} from '@/services/examplepostcategory';
import {checkRespData} from '@/utils/BdHelper';

export default {
  namespace: 'examplepostcategory',

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
      const response = yield call(queryExamplePostCategory, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *store({ payload, callback }, { call, put }) {
      const response = yield call(storeExamplePostCategory, payload);
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
      const response = yield call(destroyExamplePostCategory , payload);

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
      const response = yield call(updateExamplePostCategory, payload);

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
      const response = yield call(enableExamplePostCategory, payload);

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
