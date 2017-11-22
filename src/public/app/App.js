import React from 'react';
import Menu from './Menu.jsx';
import Search from './Search.jsx';
import Diff from './Diff.jsx';
import { render } from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

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
  }
  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <Search
                symbolSearched={this.state.symbolSearched}
                handleInputSymbol={this.handleInputSymbol}
                handleSymbolSubmit={this.handleSymbolSubmit}
              />
            )}
          />
          <Route
            exact
            path="/diff"
            render={() => (
              <Diff
                symbolSearched={this.state.symbolSearched}
                handleInputSymbol={this.handleInputSymbol}
                handleSymbolSubmit={this.handleSymbolSubmit}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
