import React from 'react';
import { Container } from 'flux/utils';
import CartStore from '../stores/CartStore';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cartStore = this.state.cartStore;

    let total = cartStore.reduce((prev, curr) => {
      return prev += (curr.price * curr.quantity);
    }, 0);
    return(
      <div className="Card">
        <div className="flux-cart active">
          <div className="mini-cart">
            <button type="button" className="close-cart">×</button>
            <ul>
              {
                cartStore.map((item) => {
                  return (
                    <li key={item.sku}>
                      <h1 className="name">{item.name}</h1>
                      <p className="type">{item.type}</p>
                      <p className="price">${item.price} * {item.quantity}</p>
                      <button type="button" className="remove-item">Remove</button>
                    </li>
                  );
                })
              }
            </ul>
            <span className="total">Total: ${total.toFixed(2)}</span>
          </div>
          <button type="button" className="view-cart">View Cart</button>
        </div>
      </div>
    );
  }
}

Card.getStores = () => [CartStore];
Card.calculateState = (prevState) => {
  return ({
    cartStore: CartStore.getState()
  })
}

export default Container.create(Card);
