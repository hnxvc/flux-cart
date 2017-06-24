import 'whatwg-fetch';

let ProductAPI = {
  getProducts() {
    return fetch('data.json')
          .then(response => {
            return response.json()
          })
  }
}

export default ProductAPI;
