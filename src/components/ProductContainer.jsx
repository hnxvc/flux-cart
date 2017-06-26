import React from 'react';
import Product from './Product';
import ProductsStore from '../stores/ProductsStore';
import CartStore from '../stores/CartStore';
import { Container } from 'flux/utils';
import Actions from '../actions/Actions';

class ProductContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddToCard = this.handleAddToCard.bind(this);
  }

  handleAddToCard(sku) {
    let item = this.state.products.variants.find(item => {
      return item.sku === sku;
    });

    item = Object.assign(
      {},
      item,
      {name: this.state.products.name},
      {quantity: 1}
    );

    if(this.checkProductExistsStore(item)) {
      Actions.updateQuantity(item)
    } else {
      Actions.addToCart(item);
    }
  }

  checkProductExistsStore(item) {
    let sku = item.sku;
    let index = this.state.cartStore.findIndex(item=> {
      return item.sku === sku;
    });

    return (index !== -1) ? true : false;
  }

  componentDidMount() {
    Actions.getProducts();
  }

  render() {
    return(
      <div className="ProductContainer">
        <Product
          {...this.state}
          handleAddToCard={this.handleAddToCard}
        />
      </div>
    );
  }
}

ProductContainer.getStores = () => ([ProductsStore, CartStore]);
ProductContainer.calculateState = (prevState) => {
  return ({
    products: ProductsStore.getState(),
    cartStore: CartStore.getState()
  })
}

export default Container.create(ProductContainer);
