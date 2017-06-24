import React from 'react';

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="Product">
        <div className="flux-product">
        <img src='https://raw.githubusercontent.com/scotch-io/react-flux-cart/master/img/scotch-beer.png' />
        <div className="flux-product-detail">
          <h1 className="name">Product name</h1>
          <p className="description">Description</p>
          <p className="price">Price: $20</p>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <button type="button">
            Add To Cart
          </button>
        </div>
      </div>
      </div>
    );
  }
}

export default Product;
