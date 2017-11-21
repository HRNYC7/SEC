import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super();
    this.state = {
      symbolSearch: ''
    };
  }
  handleInputSymbol(e) {
    this.setState({
      symbolSearch: e.target.value
    });
  }
  render() {
    return (
      <div className="search-container">
        <input
          className="search-input"
          placeholder="search.."
          value={this.state.symbolSearch}
          onChange={this.handleInputSymbol.bind(this)}
        />
        <div
          className="search-submitButton flex-centered"
          onClick={() => this.props.handleSymbolSubmit(this.state.symbolSearch)}
        >
          submit
        </div>
      </div>
    );
  }
}

export default Search;
