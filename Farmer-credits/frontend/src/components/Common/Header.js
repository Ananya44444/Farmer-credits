import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-leaf"></i>
            <h1>Farmer Carbon Credits</h1>
          </div>
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/farms">My Farms</Link></li>
              <li><Link to="/wallet">Wallet</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;