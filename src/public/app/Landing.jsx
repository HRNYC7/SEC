import React from 'react';

import Dropdown from './Dropdown.jsx';
import Search from './Search.jsx';

class Landing extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="landing-container flex-centered">
			
				<span className="landing-title">SEC</span>
				<Search 
					symbolToBeSearched={this.props.symbolToBeSearched}
					handleInputSymbol={this.props.handleInputSymbol}
					handleSymbolSubmit={this.props.handleSymbolSubmit}
				/>
				
				{ this.props.searchedSymbol && <div className="landing-subheader">results for {this.props.searchedSymbol}</div>}

				{ this.props.links && 
					<Dropdown links={this.props.links} />
				}

			</div>
		)
	}
}

export default Landing; 