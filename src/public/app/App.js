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
      availableFormTypes: null,
      selectedFormType: null,
    };
    this.handleInputSymbol = this.handleInputSymbol.bind(this);
    this.handleSymbolSubmit = this.handleSymbolSubmit.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleDocTypeTraversal = this.handleDocTypeTraversal.bind(this);
    this.handleSelectFormType = this.handleSelectFormType.bind(this);
  }
  handleDocTypeTraversal(data) {
    const docTypeList = [];
    data.map(result => {
      if(!docTypeList.includes(result.docType)) {
        docTypeList.push(result.docType)
      }
    })
    return docTypeList;
  }
  handleInputSymbol(e) {
    this.setState({
      symbolToBeSearched: e.target.value
    });
  }
  handleSymbolSubmit() {
    const url = `/search/${this.state.symbolToBeSearched}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('returned from server', data)
        this.setState({
          links: data,
          searchedSymbol: this.state.symbolToBeSearched,
          availableFormTypes: this.handleDocTypeTraversal(data),
          selectedFormType: this.handleDocTypeTraversal(data)[0],
        })
      })
      .catch(err => {
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
  handleSelectFormType(type) {
    this.setState({
      selectedFormType: type
    })
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
                availableFormTypes={this.state.availableFormTypes}
                selectedFormType={this.state.selectedFormType}
                handleSelectFormType={this.handleSelectFormType}
              />
            )}
          /> 
        </div>
      </HashRouter>
    );
  }
}

export default App;
