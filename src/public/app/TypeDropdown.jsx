import React from 'react';

class TypeDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }
  toggleDropDown() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (
      <div className="typeDropdown">
        <span>type</span>
        <ul style={{height: this.state.isOpen ? '110px' : '36px' }}>
          {this.props.availableFormTypes.map((type, i) => {
            return <li key={i} onClick={() => { this.props.handleSelectFormType(type); this.toggleDropDown(); }}>{type}</li>
          })}
        </ul>
        <button onClick={() => this.toggleDropDown()}><i className={`fa fa-caret-${this.state.isOpen ? 'down' : 'right'}`} aria-hidden="true"></i></button>
      </div>
    )
  }
}

export default TypeDropdown;