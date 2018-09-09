import {queryComponent, updateComponent, updateMenuStatus, removeMenu , addComponent, } from '@/services/base';

export default {
  namespace: 'component',

  state: {
    data: {
      list: [],
      menuTree: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryComponent, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addComponent, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeMenu , payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateComponent, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *status({ payload, callback }, { call, put }) {
      const response = yield call(updateMenuStatus, payload);
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
