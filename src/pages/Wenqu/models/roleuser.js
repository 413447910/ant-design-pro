import {queryRoleUser, updateRoleUser, destroyRoleUser , storeRoleUser, enableRoleUser} from '@/services/roleuser';
import {checkRespData} from '@/utils/BdHelper';

export default {
  namespace: 'roleuser',

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
      const response = yield call(queryRoleUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *store({ payload, callback }, { call, put }) {
      const response = yield call(storeRoleUser, payload);
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
      const response = yield call(destroyRoleUser , payload);

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
      const response = yield call(updateRoleUser, payload);

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
      const response = yield call(enableRoleUser, payload);

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
