import {queryMenu, updateMenu, updateMenuStatus, removeMenu , addMenu, } from '@/services/api';

export default {
  namespace: 'menu',

  state: {
    data: {
      list: [],
      menuTree: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryMenu, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      console.log('add data ', payload)
      const response = yield call(addMenu, payload);
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
      const response = yield call(updateMenu, payload);
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
