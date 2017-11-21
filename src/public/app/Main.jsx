import React from 'react';
import Search from './Search.jsx';

class Main extends React.Component {
  constructor() {
    super();
  }
  handleSymbolSubmit(symbol) {
    console.log(`submitting ${symbol} symbol!`);
  }
  render() {
    return (
      <div className="main-container flex-centered">
        <span className="main-title">SEC</span>
        <Search handleSymbolSubmit={this.handleSymbolSubmit.bind(this)} />
      </div>
    );
  }
}

export default Main;
