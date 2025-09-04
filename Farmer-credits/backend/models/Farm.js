const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: Number,
    required: true,
    min: 0.1
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  cropType: {
    type: String,
    enum: ['wheat', 'corn', 'rice', 'soybean', 'cotton', 'other'],
    required: true
  },
  season: {
    type: String,
    enum: ['spring', 'summer', 'fall', 'winter'],
    required: true
  },
  practices: {
    type: [String],
    default: []
  },
  carbonCredits: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

farmSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Farm', farmSchema);


