import React from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchEnterKeyPress = this.handleSearchEnterKeyPress.bind(this);
  }
  handleSearchEnterKeyPress(e) {
    if (e.charCode == 13) {
      this.props.handleSymbolSubmit()
    }
  }
  render() {
    return (
      <div className="search-field">
        <input
          className="search-input"
          placeholder="search.."
          value={this.props.symbolToBeSearched}
          onChange={this.props.handleInputSymbol}
          onKeyPress={this.handleSearchEnterKeyPress}
        />
        <div
          className="search-submitButton flex-centered"
          onClick={this.props.handleSymbolSubmit}
        >
          submit
        </div>
      </div>
    );
  }
}

export default Search;
