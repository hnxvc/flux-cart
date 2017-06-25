import { ReduceStore } from 'flux/utils';
import AppDispatcher from '../dispatcher/Dispatcher';
import constants from '../constants';

class CartStore extends ReduceStore {
  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch(action.type) {
      case constants.ADD_TO_CART:
        return state.concat([action.data]);
      default:
        return state;
    }
  }
}

export default new CartStore(AppDispatcher);
