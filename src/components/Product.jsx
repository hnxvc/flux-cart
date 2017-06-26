import React from 'react';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: '',
      price: 0
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    let sku = e.target.value;
    let variants = this.props.products.variants;
    let index = variants.findIndex(item => {
      return item.sku === sku;
    })

    let price = variants[index].price;

    this.props.onChange(sku, price);
  }

  render() {
    let products = this.props.products;
    return(
      <div className="Product">
        <div className="flux-product">
        <img src={products.image} alt={products.name}/>
        <div className="flux-product-detail">
          <h1 className="name">{products.name}</h1>
          <p className="description">{products.description}</p>
          <p className="price">Price: ${this.props.price}</p>
          <select
            onChange={this.onChange}
            value={this.props.sku}
          >
            {
              products.variants && products.variants.map(item => {
                return <option key={item.sku} value={item.sku}>{item.type}</option>
              })
            }
          </select>
          <button type="button"
            onClick={() => this.props.handleAddToCard()}
            disabled={this.props.isSoldOut}
          >
            {
              this.props.isSoldOut ?
                'Sold out'
              :
                'Add To Cart'
            }
          </button>
        </div>
      </div>
      </div>
    );
  }
}

export default Product;
