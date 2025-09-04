import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatsCard from './StatsCard';
import QuickActions from './QuickActions';
import { creditsAPI } from '../../services/credits';
import { farmAPI } from '../../services/farm';

const Dashboard = () => {
  const [stats, setStats] = useState({
    farmSize: 0,
    cropCount: 0,
    creditTotal: 0,
    earningsTotal: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [creditsResponse, farmsResponse] = await Promise.all([
          creditsAPI.getCreditsSummary(),
          farmAPI.getFarms()
        ]);
        
        if (creditsResponse.data.success && farmsResponse.data.success) {
          const creditsData = creditsResponse.data.data;
          const farms = farmsResponse.data.data.farms || [];
          
          setStats({
            farmSize: farms.reduce((sum, farm) => sum + Number(farm.size || 0), 0),
            cropCount: new Set(farms.map(f => f.cropType)).size,
            creditTotal: Number(creditsData.totalCredits || 0),
            earningsTotal: Number(creditsData.estimatedValue || 0)
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="main-content">
        <h2 className="section-title">Farmer Dashboard</h2>
        
        <div className="dashboard-cards">
          <StatsCard
            icon="fas fa-tractor"
            value={Number(stats.farmSize || 0).toFixed(1)}
            label="Hectares of Farmland"
          />
          <StatsCard
            icon="fas fa-seedling"
            value={stats.cropCount}
            label="Crop Types"
          />
          <StatsCard
            icon="fas fa-coins"
            value={Number(stats.creditTotal || 0)}
            label="Total Carbon Credits"
          />
          <StatsCard
            icon="fas fa-hand-holding-usd"
            value={`$${Number(stats.earningsTotal || 0).toFixed(2)}`}
            label="Total Earnings"
          />
        </div>
        
        <h2 className="section-title">Quick Actions</h2>
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;