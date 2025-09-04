import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { farmAPI } from '../../services/farm';

const FarmForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    location: {
      type: 'Point',
      coordinates: [0, 0]
    },
    cropType: '',
    season: '',
    practices: []
  });
  const [creditEstimate, setCreditEstimate] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const fetchFarm = async () => {
        try {
          const response = await farmAPI.getFarm(id);
          if (response.data.success) {
            setFormData(response.data.data.farm);
          }
        } catch (error) {
          console.error('Error fetching farm:', error);
        }
      };
      fetchFarm();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePracticeChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const practices = checked 
        ? [...prev.practices, value]
        : prev.practices.filter(p => p !== value);
      
      return { ...prev, practices };
    });
  };

  const calculateCredits = () => {
    // Simple calculation - in real app, this would call the backend
    const baseRate = 2.4;
    const credits = formData.size * baseRate;
    setCreditEstimate(credits.toFixed(1));
    setShowResults(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.size || !formData.cropType || !formData.season) {
      return setError('Please fill all required fields');
    }
    
    try {
      setError('');
      setLoading(true);
      
      if (isEdit) {
        await farmAPI.updateFarm(id, formData);
      } else {
        await farmAPI.addFarm(formData);
      }
      
      navigate('/farms');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save farm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="main-content">
        <h2 className="section-title">{isEdit ? 'Edit Farm' : 'Add New Farm'}</h2>
        
        <div className="map-container">
          <p>Interactive map would appear here for drawing farm boundaries</p>
        </div>
        
        <div className="farm-form">
          <h3>Farm Details</h3>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Farm Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter farm name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="size">Farm Size (hectares) *</label>
                <input
                  type="number"
                  id="size"
                  name="size"
                  className="form-control"
                  placeholder="Enter size in hectares"
                  value={formData.size}
                  onChange={handleChange}
                  min="0.1"
                  step="0.1"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cropType">Crop Type *</label>
                <select
                  id="cropType"
                  name="cropType"
                  className="form-control"
                  value={formData.cropType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select crop type</option>
                  <option value="wheat">Wheat</option>
                  <option value="corn">Corn</option>
                  <option value="rice">Rice</option>
                  <option value="soybean">Soybean</option>
                  <option value="cotton">Cotton</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="season">Season *</label>
                <select
                  id="season"
                  name="season"
                  className="form-control"
                  value={formData.season}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select season</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="fall">Fall</option>
                  <option value="winter">Winter</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label>Sustainable Practices</label>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="no-till"
                    checked={formData.practices.includes('no-till')}
                    onChange={handlePracticeChange}
                  />
                  No-till farming
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="cover-crops"
                    checked={formData.practices.includes('cover-crops')}
                    onChange={handlePracticeChange}
                  />
                  Cover crops
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="organic"
                    checked={formData.practices.includes('organic')}
                    onChange={handlePracticeChange}
                  />
                  Organic farming
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="agroforestry"
                    checked={formData.practices.includes('agroforestry')}
                    onChange={handlePracticeChange}
                  />
                  Agroforestry
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="crop-rotation"
                    checked={formData.practices.includes('crop-rotation')}
                    onChange={handlePracticeChange}
                  />
                  Crop rotation
                </label>
              </div>
            </div>
            
            <button 
              type="button" 
              className="btn btn-accent"
              onClick={calculateCredits}
            >
              Calculate Carbon Credits
            </button>
            
            {showResults && (
              <div className="results-container">
                <div className="credit-estimate">
                  <h3>Estimated Carbon Credits</h3>
                  <div className="credit-value">{creditEstimate}</div>
                  <p>Based on your farm details and sustainable practices</p>
                </div>
              </div>
            )}
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Farm Details'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FarmForm;