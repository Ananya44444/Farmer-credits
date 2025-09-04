import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  return (
    <div className="dashboard-cards">
      <Link to="/farms/new" style={{ textDecoration: 'none' }}>
        <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }}>
          <i className="fas fa-plus-circle" style={{ fontSize: '3rem', color: '#2196F3', marginBottom: '15px' }}></i>
          <h3>Add Farm</h3>
          <p>Register your farmland</p>
        </div>
      </Link>
      
      <Link to="/farms" style={{ textDecoration: 'none' }}>
        <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }}>
          <i className="fas fa-chart-line" style={{ fontSize: '3rem', color: '#4CAF50', marginBottom: '15px' }}></i>
          <h3>View Credits</h3>
          <p>Check your carbon credits</p>
        </div>
      </Link>
      
      <Link to="/wallet" style={{ textDecoration: 'none' }}>
        <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }}>
          <i className="fas fa-wallet" style={{ fontSize: '3rem', color: '#FF9800', marginBottom: '15px' }}></i>
          <h3>Wallet</h3>
          <p>View your earnings</p>
        </div>
      </Link>
    </div>
  );
};

export default QuickActions;