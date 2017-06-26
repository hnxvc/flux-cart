import React, { Component } from 'react';
import ProductContainer from './components/ProductContainer';
import CardContainer from './components/CardContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ProductContainer />
        <CardContainer />
      </div>
    );
  }
}

export default App;
