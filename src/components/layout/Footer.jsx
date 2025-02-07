import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>CoinLore App</h3>
          <p>Coinlore Independent Cryptocurrency Research Platform</p>
        </div>
        
        <div className="footer-section">
          <h3>Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/exchanges">Exchanges</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/api">API Info</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>Email: email@example.com</li>
            <li>X App: @example.x</li>
            <li>Telegram: @example.tg</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CoinLore. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 