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
                  <a href={link.link} target="blank">
                  {i+1}. {link.docType}  qtr: {link.date.quarter}  -  {link.date.year}
                  </a>
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