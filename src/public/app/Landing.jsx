import React from 'react';
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
                    symbolSearched={this.props.symbolSearched}
                    handleInputSymbol={this.props.handleInputSymbol}
                    handleSymbolSubmit={this.props.handleSymbolSubmit}
                />
            </div>
        )
    }
}

export default Landing; 