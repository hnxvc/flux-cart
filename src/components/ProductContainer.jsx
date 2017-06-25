import React from 'react';
import Product from './Product';
import ProductsStore from '../stores/ProductsStore'
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
    })
    item = Object.assign(
      {},
      item,
      {name: this.state.products.name}
    );

    Actions.addToCart(item);
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

ProductContainer.getStores = () => ([ProductsStore]);
ProductContainer.calculateState = (prevState) => {
  return ({
    products: ProductsStore.getState(),
  })
}

export default Container.create(ProductContainer);
