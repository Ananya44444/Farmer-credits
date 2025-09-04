import api from './api';

export const creditsAPI = {
  getCreditsSummary: () => api.get('/api/credits/summary'),
  getTransactions: (page = 1, limit = 10) => 
    api.get(`/api/credits/transactions?page=${page}&limit=${limit}`),
  sellCredits: (creditsToSell) => api.post('/api/credits/sell', { creditsToSell }),
};