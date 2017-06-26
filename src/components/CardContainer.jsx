import React from 'react';
import Card from './Card';
import { Container } from 'flux/utils';
import CartStore from '../stores/CartStore';
import Actions from '../actions/Actions';

class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardStore: CartStore.getState(),
      total: 0
    };

    this.removeProduct = this.removeProduct.bind(this);
  }

  removeProduct(sku) {
    Actions.removeProduct(sku);
  }

  componentDidUpdate() {
    let total = this.state.cartStore.reduce((prev, curr) => {
      return prev += (curr.price * curr.quantity);
    }, 0);
    this.setState({
      total: total
    })
  }

  render() {
    return(
      <Card {...this.state}
        removeProduct={this.removeProduct}
      />
    );
  }
}

CardContainer.getStores = () => [CartStore];
CardContainer.calculateState = (prevState) => {
  return ({
    cartStore: CartStore.getState()
  })
}

export default Container.create(CardContainer);
