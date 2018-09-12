import {addEffective, } from '@/services/base';

export default {
  namespace: 'effective',

  state: {
    data: {
      list: [],
    },
  },

  effects: {
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addEffective, payload);
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
        data: action.payload,
      };
    },
  },
};
