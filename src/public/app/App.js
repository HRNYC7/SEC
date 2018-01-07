import React from 'react';
import Landing from './Landing.jsx';
import Menu from './Menu.jsx';
import Search from './Search.jsx';
import Diff from './Diff.jsx';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbolToBeSearched: '',
      symbolSearched: '',
      links: null,
    };
    this.handleInputSymbol = this.handleInputSymbol.bind(this);
    this.handleSymbolSubmit = this.handleSymbolSubmit.bind(this);
  }
  handleInputSymbol(e) {
    this.setState({
      symbolToBeSearched: e.target.value
    });
  }
  handleSymbolSubmit() {
    console.log(`submitting ${this.state.symbolToBeSearched} symbol!`);

    // not setting
    this.setState({
      symbolSearched: this.state.symbolTobeSearched
    })

    const url = `/search/${this.state.symbolToBeSearched}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          links: data,
        })
      })
      .catch(err => console.error('error returned from fetch!', err))
  }
  render() {
    return (
      <HashRouter>
        <div>
          <Route 
            exact path="/"
            render={() => (
              <Landing 
                symbolToBeSearched={this.state.symbolToBeSearched}
                handleInputSymbol={this.handleInputSymbol}
                handleSymbolSubmit={this.handleSymbolSubmit}
              />
            )}
          />
          <Route 
            exact path="/diff"
            render={() => (
              <Diff
                symbolToBeSearched={this.state.symbolToBeSearched}
                symbolSearched={this.state.symbolSearched}
                handleInputSymbol={this.handleInputSymbol}
                handleSymbolSubmit={this.handleSymbolSubmit}
                links={this.state.links}
              />
            )}
          />
        </div>
      </HashRouter>
    );
  }
}

export default App;
