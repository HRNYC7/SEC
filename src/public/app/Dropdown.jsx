import React from 'react';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="dropdown-container flex-centered">
        {this.props.links.length > 1 ?
          <ul className="dropdown-wrapper">
            {this.props.links.map((link, i) => {
              return (
                <li className="dropdown-item" key={i}>
                  <a href={link.link} target="blank">
                  {i+1}. {link.docType}  Q{link.date.quarter} {link.date.year}
                  </a>
                </li>
              )
            })}
          </ul>
          :
          '0 results'
        }
      </div>
    )
  }
}

export default Dropdown;