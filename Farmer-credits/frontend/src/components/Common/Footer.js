import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Farmer Carbon Credits</h3>
            <p>Empowering farmers to earn carbon credits through sustainable practices.</p>
            
          </div>
          
          {/* <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div> */}
          
          <div className="footer-section">
            <h3>Contact Information</h3>
            <ul>
              <li><i className="fas fa-map-marker-alt"></i> 123 Farm Road, Agricultural City</li>
              <li><i className="fas fa-phone"></i> +1 (555) 123-4567</li>
              <li><i className="fas fa-envelope"></i> support@farmercarbon.com</li>
            </ul>
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; 2025 Farmer Carbon Credits. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;