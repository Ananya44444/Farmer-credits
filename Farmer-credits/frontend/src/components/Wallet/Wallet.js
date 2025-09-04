import React, { useEffect, useState } from 'react';
import { creditsAPI } from '../../services/credits';

const Wallet = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await creditsAPI.getCreditsSummary();
        if (res.data.success) {
          setSummary(res.data.data);
        }
      } catch (e) {
        console.error('Failed to load wallet summary', e);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return <div className="container"><div className="main-content">Loading...</div></div>;

  return (
    <div className="container">
      <div className="main-content">
        <h2 className="section-title">Wallet</h2>
        <div className="dashboard-cards">
          <div className="card stat-card">
            <i className="fas fa-coins"></i>
            <h3>{summary?.totalCredits || 0}</h3>
            <p>Total Credits</p>
          </div>
          <div className="card stat-card">
            <i className="fas fa-hand-holding-usd"></i>
            <h3>${summary?.estimatedValue?.toFixed(2) || '0.00'}</h3>
            <p>Estimated Value</p>
          </div>
        </div>
        <h3 style={{ marginTop: '20px' }}>Recent Transactions</h3>
        {summary?.transactions?.length ? (
          <ul>
            {summary.transactions.map((t) => (
              <li key={t._id}>{t.description} - ${t.amount} - {new Date(t.createdAt).toLocaleString()}</li>
            ))}
          </ul>
        ) : (
          <p>No recent transactions.</p>
        )}
      </div>
    </div>
  );
};

export default Wallet;


