import React from 'react';

import Dropdown from './Dropdown.jsx';
import TypeDropdown from './TypeDropdown.jsx';
import Message from './Message.jsx';
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

				{/* error message: incorrect ticker */}
				{ this.props.message && <Message message={this.props.message} backgroundColor={'#DA4343'} /> }

				{ this.props.searchedSymbol 
					&& 
					<div className="landing-subheader">
						results for <span>{this.props.searchedSymbol.toUpperCase()}</span>
					</div>
				}

				{ this.props.links && 
					<TypeDropdown availableFormTypes={this.props.availableFormTypes} handleSelectFormType={this.props.handleSelectFormType} />
				}

				{ this.props.links && 
					<Dropdown links={this.props.links} selectedFormType={this.props.selectedFormType} />
				}

			</div>
		)
	}
}

export default Landing; 