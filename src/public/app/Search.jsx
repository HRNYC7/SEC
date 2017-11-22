import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super();
    this.state = {
      symbolSearch: ''
    };
    this.handleInputSymbol = this.handleInputSymbol.bind(this);
    this.handleSymbolSubmit = this.handleSymbolSubmit.bind(this);
  }
  handleInputSymbol(e) {
    this.setState({
      symbolSearch: e.target.value
    });
  }
  handleSymbolSubmit(symbol) {
    console.log(`submitting ${symbol} symbol!`);
  }
  render() {
    return (
      <div className="search-container flex-centered">
        <div className="search-wrapper" />
        <span className="search-title">SEC</span>
        <div className="search-field">
          <input
            className="search-input"
            placeholder="search.."
            value={this.state.symbolSearch}
            onChange={this.handleInputSymbol}
          />
          <div
            className="search-submitButton flex-centered"
            onClick={() => this.handleSymbolSubmit(this.state.symbolSearch)}
          >
            submit
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
