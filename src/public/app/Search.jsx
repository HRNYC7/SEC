import React from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  constructor(props) {
    super();
    this.handleSearchEnterKeyPress = this.handleSearchEnterKeyPress.bind(this);
  }
  handleSearchEnterKeyPress(e) {
    if (e.charCode == 13) {
      this.props.handleSymbolSubmit()
      window.location.href = "/#/diff";
    }
  }
  render() {
    return (
      <div className="search-field">
        <input
          className="search-input"
          placeholder="search.."
          value={this.props.symbolSearch}
          onChange={this.props.handleInputSymbol}
          onKeyPress={this.handleSearchEnterKeyPress}
        />
        <Link
          to="/diff"
          className="search-submitButton flex-centered"
          onClick={this.props.handleSymbolSubmit}
        >
          submit
        </Link>
      </div>
    );
  }
}

export default Search;
