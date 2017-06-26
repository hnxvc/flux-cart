import React from 'react';

class Card extends React.Component {
  render() {
    let cartStore = this.props.cartStore;

    return(
      <div className="Card">
        <div className="flux-cart active">
          <div className="mini-cart">
            <ul>
              {
                cartStore.map((item) => {
                  return (
                    <li key={item.sku}>
                      <h1 className="name">{item.name}</h1>
                      <p className="type">{item.type}</p>
                      <p className="price">${item.price} * {item.quantity}</p>
                      <button type="button" className="remove-item"
                        onClick={()=>this.props.removeProduct(item.sku)}
                        >Remove</button>
                    </li>
                  );
                })
              }
            </ul>
            <span className="total">Total: ${this.props.total.toFixed(2)}</span>
          </div>
          <button type="button" className="view-cart">View Cart</button>
        </div>
      </div>
    );
  }
}


export default Card;
