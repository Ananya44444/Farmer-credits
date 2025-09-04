import React from 'react';

const StatsCard = ({ icon, value, label }) => {
  return (
    <div className="card stat-card">
      <i className={icon}></i>
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
};

export default StatsCard;