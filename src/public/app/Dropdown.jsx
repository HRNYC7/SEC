import React from 'react';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="dropdown-container">
        {this.props.links && 
          <ul className="dropdown-wrapper">
            {this.props.links.map((link, i) => {
              return (
                <li className="dropdown-item" key={i}>
                  {i+1}: {link.docType} - {link.date.month}/{link.date.day}/{link.date.year}
                </li>
              )
            })}
          </ul>
        }
      </div>
    )
  }
}

export default Dropdown;