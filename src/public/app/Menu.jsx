import React from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="menu-container">
        <Link to="/" className="menu-button">
          Home
        </Link>
      </div>
    );
  }
}

export default Menu;
