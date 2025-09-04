import api from './api';

export const farmAPI = {
  getFarms: () => api.get('/api/farms'),
  getFarm: (id) => api.get(`/api/farms/${id}`),
  addFarm: (farmData) => api.post('/api/farms', farmData),
  updateFarm: (id, farmData) => api.put(`/api/farms/${id}`, farmData),
  deleteFarm: (id) => api.delete(`/api/farms/${id}`),
};