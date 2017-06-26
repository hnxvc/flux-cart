import AppDispatcher from '../dispatcher/Dispatcher';
import ProductAPI from '../utils/ProductAPI';
import constants from '../constants';

let Actions = {
  getProducts() {
    AppDispatcher.dispatch({
      type: constants.LOAD_PRODUCT
    });

    ProductAPI.getProducts()
    .then(response => {
      AppDispatcher.dispatch({
        type: constants.LOAD_PRODUCT_SUCCESS,
        data: response
      });
    })
    .catch(error => {
      AppDispatcher.dispatch({
        type: constants.LOAD_PRODUCT_ERROR,
        error: error
      });
    });

  },

  addToCart(item) {
    AppDispatcher.dispatch({
      type: constants.ADD_TO_CART,
      data: item
    });
  },

  updateQuantity(item) {
    AppDispatcher.dispatch({
      type: constants.UPDATE_QUANTITY,
      data: item
    })
  },

  removeProduct(sku) {
    AppDispatcher.dispatch({
      type: constants.REMOVE_PRODUCT,
      data: {sku}
    })
  }
}

export default Actions;
