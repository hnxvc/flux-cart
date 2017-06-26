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
    this.isProductSoldOut = this.isProductSoldOut.bind(this);
    this.isProductExistsStore = this.isProductExistsStore.bind(this);
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

    if(this.isProductExistsStore(item)) {
      Actions.updateQuantity(item);
    } else {
      Actions.addToCart(item);
    }
  }

  isProductExistsStore(item) {
    let sku = item.sku;
    let index = this.state.cartStore.findIndex(item=> {
      return item.sku === sku;
    });

    return (index !== -1) ? true : false;
  }

  isProductSoldOut(sku) {
    if(this.state.cartStore.length === 0) {
      return;
    }

    let item = this.state.cartStore.find(item=> {
      return item.sku === sku;
    });
    if(!item) {
      return false;
    }

    let quantity = item.quantity;

    let product = this.state.products.variants.find(item => {
      return item.sku === sku;
    });
    let inventory = product.inventory;
    return (quantity >= inventory);
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
    } else {
      this.setState({
        isSoldOut: this.isProductSoldOut(this.state.sku)
      });
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
