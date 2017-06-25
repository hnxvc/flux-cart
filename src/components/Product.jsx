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

    this.setState({
      sku,
      price
    });
  }


  componentWillReceiveProps(nextProps) {
    let variants = nextProps.products.variants;
    let price = variants[0].price;
    let sku = variants[0].sku;
    this.setState({
      price,
      sku
    });
  }

  render() {
    let products = this.props.products;
    return(
      <div className="Product">
        <div className="flux-product">
        <img src={products.image} />
        <div className="flux-product-detail">
          <h1 className="name">{products.name}</h1>
          <p className="description">{products.description}</p>
          <p className="price">Price: ${this.state.price}</p>
          <select onChange={this.onChange}>
            {
              products.variants && products.variants.map(item => {
                return <option key={item.sku} value={item.sku}>{item.type}</option>
              })
            }
          </select>
          <button type="button"
            onClick={() => this.props.handleAddToCard(this.state.sku)}
          >
            Add To Cart
          </button>
        </div>
      </div>
      </div>
    );
  }
}

export default Product;
