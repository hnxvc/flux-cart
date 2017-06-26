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

      case constants.UPDATE_QUANTITY:
        let data = action.data;
        let index = state.findIndex(item => {
          return item.sku === data.sku;
        });

        let product = state[index];
        product.quantity += data.quantity;

        state.splice(index, 1, product);
        return state.concat([]);

      default:
        return state;
    }
  }
}

export default new CartStore(AppDispatcher);
