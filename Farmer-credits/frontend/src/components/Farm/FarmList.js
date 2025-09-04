import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { farmAPI } from '../../services/farm';

const FarmList = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await farmAPI.getFarms();
        if (res.data.success) {
          setFarms(res.data.data.farms || []);
        }
      } catch (e) {
        console.error('Failed to load farms', e);
      } finally {
        setLoading(false);
      }
    };
    fetchFarms();
  }, []);

  if (loading) return <div className="container"><div className="main-content">Loading...</div></div>;

  return (
    <div className="container">
      <div className="main-content">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="section-title">My Farms</h2>
          <Link to="/farms/new" className="btn btn-primary">Add Farm</Link>
        </div>
        {farms.length === 0 ? (
          <p>No farms yet. Click "Add Farm" to create one.</p>
        ) : (
          <div className="dashboard-cards">
            {farms.map((farm) => (
              <div className="card" key={farm._id}>
                <h3>{farm.name}</h3>
                <p>Size: {farm.size} ha</p>
                <p>Crop: {farm.cropType} • Season: {farm.season}</p>
                <p>Credits: {farm.carbonCredits}</p>
                <div style={{ marginTop: '10px' }}>
                  <Link className="btn btn-outline" to={`/farms/edit/${farm._id}`}>Edit</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmList;


