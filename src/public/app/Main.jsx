import React from 'react';

class Main extends React.Component {
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
  handleSymbolSubmit() {
    console.log('submitting symbol!');
  }
  render() {
    return (
      <div className="main-wrapper">
        <h1>SEC</h1>
        <div>
          <input
            placeholder="search"
            value={this.state.symbolSearch}
            onChange={this.handleInputSymbol}
          />
          <button onClick={this.handleSymbolSubmit}>submit</button>
        </div>
      </div>
    );
  }
}

export default Main;
