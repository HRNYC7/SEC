import React from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="search-container flex-centered">
        <span className="search-title">SEC</span>
        <div className="search-field">
          <input
            className="search-input"
            placeholder="search.."
            value={this.props.symbolSearch}
            onChange={this.props.handleInputSymbol}
          />
          <Link
            to="/diff"
            className="search-submitButton flex-centered"
            onClick={this.props.handleSymbolSubmit}
          >
            submit
          </Link>
        </div>
      </div>
    );
  }
}

export default Search;
