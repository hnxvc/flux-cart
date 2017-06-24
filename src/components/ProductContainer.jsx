import React from 'react';
import Product from './Product';

class ProductContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="ProductContainer">
        <Product />
      </div>
    );
  }
}

export default ProductContainer;
