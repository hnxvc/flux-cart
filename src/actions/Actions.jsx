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

  }
}

export default Actions;
