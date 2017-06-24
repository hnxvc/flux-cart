import { ReduceStore } from 'flux/utils';
import AppDispatcher from '../dispatcher/Dispatcher';
import constants from '../constants';

class ProductStore extends ReduceStore {
  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch(action.type) {
      case constants.LOAD_PRODUCT_SUCCESS:
        return action.data;
      default:
        return state;
    }
  }
}

export default new ProductStore(AppDispatcher);
