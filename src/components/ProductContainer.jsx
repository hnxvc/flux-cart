import React from 'react';
import Product from './Product';
import ProductsStore from '../stores/ProductsStore';
import CartStore from '../stores/CartStore';
import { Container } from 'flux/utils';
import Actions from '../actions/Actions';

class ProductContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: '',
      price: '',
    };
    this.handleAddToCard = this.handleAddToCard.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(sku, price) {
    this.setState({
      sku,
      price
    });
  }

  handleAddToCard() {
    let item = this.state.products.variants.find(item => {
      return item.sku === this.state.sku;
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

  componentDidUpdate() {
    if(this.state.sku === '') {
      this.setState({
        sku: this.state.products.variants[0].sku,
        price: this.state.products.variants[0].price,
      })
    }
  }

  render() {

    return(
      <div className="ProductContainer">
        <Product
          {...this.state}
          handleAddToCard={this.handleAddToCard}
          onChange={this.onChange}
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
