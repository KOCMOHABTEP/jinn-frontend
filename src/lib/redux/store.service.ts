import { UnknownAction } from 'redux';

import { AppStore } from './store';

let store: AppStore;

const setStoreReference = (storeRef: AppStore) => {
  store = storeRef;
};

const getState = () => store.getState();

const dispatch = (action: UnknownAction) => {
  store.dispatch(action);
};

const result = {
  setStoreReference,
  getState,
  dispatch,
};

export default result;
