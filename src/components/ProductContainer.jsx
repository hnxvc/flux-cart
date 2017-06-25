import React from 'react';
import Product from './Product';
import ProductsStore from '../stores/ProductsStore'
import { Container } from 'flux/utils';
import Actions from '../actions/Actions';

class ProductContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Actions.getProducts();
  }

  render() {
    return(
      <div className="ProductContainer">
        <Product {...this.state}/>
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
