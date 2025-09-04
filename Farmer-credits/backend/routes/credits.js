const express = require('express');
const router = express.Router();
const store = require('../store');

router.get('/summary', (req, res) => {
  const totalCredits = (store.farms || []).reduce((sum, f) => sum + Number(f.carbonCredits || 0), 0);
  const estimatedValue = totalCredits * 25;
  const recent = (store.transactions || []).slice(-10).reverse();
  res.json({ success: true, data: { totalCredits, estimatedValue, farmCount: 0, transactions: recent } });
});

router.get('/transactions', (req, res) => {
  const page = parseInt(req.query.page || '1', 10);
  const limit = parseInt(req.query.limit || '10', 10);
  const start = (page - 1) * limit;
  const list = (store.transactions || []).slice().reverse();
  const pageItems = list.slice(start, start + limit);
  res.json({ success: true, data: { transactions: pageItems, totalPages: Math.ceil(list.length / limit), currentPage: page, total: list.length } });
});

router.post('/sell', (req, res) => {
  const { creditsToSell } = req.body || {};
  const amount = (Number(creditsToSell) || 0) * 25;
  const tx = { _id: Date.now().toString(), type: 'credit', amount, description: `Sale of ${creditsToSell} carbon credits`, status: 'completed', createdAt: new Date().toISOString() };
  store.transactions.push(tx);
  res.json({ success: true, data: { transaction: tx } });
});

module.exports = router;