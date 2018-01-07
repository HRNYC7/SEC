import React from 'react';
import Menu from './Menu.jsx';
import Search from './Search.jsx';
import Dropdown from './Dropdown.jsx'

class Diff extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="diff-container flex-centered">
        <Menu />

        {/* <div className="search-field">
          <input
            className="search-input"
            placeholder="search.."
            value={this.props.symbolSearched}
            onChange={this.props.handleInputSymbol}
          />
          <div
            className="search-submitButton flex-centered"
            onClick={this.props.handleSymbolSubmit}
          >
            submit
          </div>
        </div> */}

        <Search 
          symbolToBeSearched={this.props.symbolToBeSearched}
          handleInputSymbol={this.props.handleInputSymbol}
          handleSymbolSubmit={this.props.handleSymbolSubmit}
        />
        
        {/* in development */}
        <span>results for {this.props.symbolSearched}</span>

        {/* dropdown in development */}
        <Dropdown links={this.props.links} />

        {/* <div className="diff-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. But I must explain to you how all this mistaken idea of denouncing pleasure
          and praising pain was born and I will give you a complete account of the system, and
          expound the actual teachings of the great explorer of the truth, the master-builder of
          human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is
          pleasure, but because those who do not know how to pursue pleasure rationally encounter
          consequences that are extremely painful. Nor again is there anyone who loves or pursues or
          desires to obtain pain of itself, because it is pain, but because occasionally
          circumstances occur in which toil and pain can procure him some great pleasure. To take a
          trivial example, which of us ever undertakes laborious physical exercise, except to obtain
          some advantage from it? But who has any right to find fault with a man who chooses to
          enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces
          no resultant pleasure
        </div> */}

      </div>
    );
  }
}

export default Diff;
