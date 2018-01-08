import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import Landing from './Landing.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbolToBeSearched: '',
      searchedSymbol: null,
      links: null,
      message: null,
    };
    this.handleInputSymbol = this.handleInputSymbol.bind(this);
    this.handleSymbolSubmit = this.handleSymbolSubmit.bind(this);
    this.handleMessage = this.handleMessage.bind(this);

  }
  handleInputSymbol(e) {
    this.setState({
      symbolToBeSearched: e.target.value
    });
  }
  handleSymbolSubmit() {
    console.log(`submitting ${this.state.symbolToBeSearched} symbol!`);
    const url = `/search/${this.state.symbolToBeSearched}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          links: data,
          searchedSymbol: this.state.symbolToBeSearched,
        })
      })
      .catch(err => {
        console.error('error returned from fetch!', err)
        this.handleMessage('Ticker does not exist. Please try again.')
      })
  }
  handleMessage(message) {
		if(!this.state.message) {
      this.setState({ message })
      window.setTimeout(() => {
        this.setState({
          message: null
        })
      }, 3000)
    }
	}
  render() {
    return (
      <HashRouter>
        <div>
          <Route 
            exact path="/"
            render={() => (
              <Landing 
                handleInputSymbol={this.handleInputSymbol}
                handleSymbolSubmit={this.handleSymbolSubmit}
                links={this.state.links}
                symbolToBeSearched={this.state.symbolToBeSearched}
                searchedSymbol={this.state.searchedSymbol}
                message={this.state.message}
              />
            )}
          /> 
        </div>
      </HashRouter>
    );
  }
}

export default App;
