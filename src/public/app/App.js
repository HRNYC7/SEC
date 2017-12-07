import React from 'react';
import Menu from './Menu.jsx';
import Search from './Search.jsx';
import Diff from './Diff.jsx';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      symbolSearched: ''
    };
    this.handleInputSymbol = this.handleInputSymbol.bind(this);
    this.handleSymbolSubmit = this.handleSymbolSubmit.bind(this);
  }
  handleInputSymbol(e) {
    this.setState({
      symbolSearched: e.target.value
    });
  }
  handleSymbolSubmit() {
    console.log(`submitting ${this.state.symbolSearched} symbol!`);
    const url = `/search?q=${this.state.symbolSearched}`
    fetch(url)
      .then(response => response.text())
      .then(text => console.log(text))
      .catch(err => console.error(err))
  }
  render() {
    return (
      <HashRouter>
        <div>
          <Route 
            exact path="/"
            render={() => (
              <Search
                symbolSearched={this.state.symbolSearched}
                handleInputSymbol={this.handleInputSymbol}
                handleSymbolSubmit={this.handleSymbolSubmit}
              />
            )}
          />
          <Route 
            exact path="/diff"
            render={() => (
              <Diff
                symbolSearched={this.state.symbolSearched}
                handleInputSymbol={this.handleInputSymbol}
                handleSymbolSubmit={this.handleSymbolSubmit}
              />
            )}
          />
        </div>
      </HashRouter>
    );
  }
}

export default App;
