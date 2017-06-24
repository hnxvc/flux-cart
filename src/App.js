import React, { Component } from 'react';
import ProductContainer from './components/ProductContainer';
import Card from './components/Card';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ProductContainer />
        <Card />
      </div>
    );
  }
}

export default App;
