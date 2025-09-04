const express = require('express');
const router = express.Router();
const store = require('../store');
const { calculateCarbonCredits } = require('../utils/creditCalculator');

// Validation-free simplified endpoints
router.post('/', (req, res) => {
  const id = Date.now().toString();
  const { size, cropType, practices } = req.body || {};
  const carbonCredits = calculateCarbonCredits(size, cropType, practices);
  const farm = { _id: id, carbonCredits, isActive: true, ...req.body };
  store.farms.push(farm);
  res.status(201).json({ success: true, data: { farm } });
});

router.get('/', (req, res) => {
  res.json({ success: true, data: { farms: store.farms } });
});

router.get('/:id', (req, res) => {
  const farm = store.farms.find(f => f._id === req.params.id);
  if (!farm) return res.status(404).json({ success: false, message: 'Farm not found' });
  res.json({ success: true, data: { farm } });
});

router.put('/:id', (req, res) => {
  const idx = store.farms.findIndex(f => f._id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Farm not found' });
  const updated = { ...store.farms[idx], ...req.body };
  updated.carbonCredits = calculateCarbonCredits(updated.size, updated.cropType, updated.practices);
  store.farms[idx] = updated;
  res.json({ success: true, data: { farm: store.farms[idx] } });
});

router.delete('/:id', (req, res) => {
  const initial = store.farms.length;
  store.farms = store.farms.filter(f => f._id !== req.params.id);
  if (store.farms.length === initial) return res.status(404).json({ success: false, message: 'Farm not found' });
  res.json({ success: true, message: 'Farm deleted successfully' });
});

module.exports = router;