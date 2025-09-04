const Farm = require('../models/Farm');
const { calculateCarbonCredits } = require('../utils/creditCalculator');

exports.addFarm = async (req, res) => {
  try {
    const { name, size, location, cropType, season, practices } = req.body;
    const farmerId = req.user.id;

    const carbonCredits = calculateCarbonCredits(size, cropType, practices);

    const farm = new Farm({
      farmer: farmerId,
      name,
      size,
      location: {
        type: 'Point',
        coordinates: location.coordinates
      },
      cropType,
      season,
      practices,
      carbonCredits
    });

    await farm.save();
    await farm.populate('farmer', 'name phone');

    res.status(201).json({
      success: true,
      message: 'Farm added successfully',
      data: { farm }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error while adding farm',
      error: error.message 
    });
  }
};

exports.getFarms = async (req, res) => {
  try {
    const farmerId = req.user.id;
    const farms = await Farm.find({ farmer: farmerId }).populate('farmer', 'name phone');

    res.json({
      success: true,
      data: { farms }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching farms',
      error: error.message 
    });
  }
};

exports.getFarm = async (req, res) => {
  try {
    const { id } = req.params;
    const farmerId = req.user.id;

    const farm = await Farm.findOne({ _id: id, farmer: farmerId }).populate('farmer', 'name phone');
    
    if (!farm) {
      return res.status(404).json({ 
        success: false, 
        message: 'Farm not found' 
      });
    }

    res.json({
      success: true,
      data: { farm }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching farm',
      error: error.message 
    });
  }
};

exports.updateFarm = async (req, res) => {
  try {
    const { id } = req.params;
    const farmerId = req.user.id;
    const updates = req.body;

    if (updates.size || updates.cropType || updates.practices) {
      const farm = await Farm.findOne({ _id: id, farmer: farmerId });
      if (!farm) {
        return res.status(404).json({ 
          success: false, 
          message: 'Farm not found' 
        });
      }

      const newSize = updates.size || farm.size;
      const newCropType = updates.cropType || farm.cropType;
      const newPractices = updates.practices || farm.practices;

      updates.carbonCredits = calculateCarbonCredits(newSize, newCropType, newPractices);
    }

    const farm = await Farm.findOneAndUpdate(
      { _id: id, farmer: farmerId },
      updates,
      { new: true, runValidators: true }
    ).populate('farmer', 'name phone');

    if (!farm) {
      return res.status(404).json({ 
        success: false, 
        message: 'Farm not found' 
      });
    }

    res.json({
      success: true,
      message: 'Farm updated successfully',
      data: { farm }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating farm',
      error: error.message 
    });
  }
};

exports.deleteFarm = async (req, res) => {
  try {
    const { id } = req.params;
    const farmerId = req.user.id;

    const farm = await Farm.findOneAndDelete({ _id: id, farmer: farmerId });
    
    if (!farm) {
      return res.status(404).json({ 
        success: false, 
        message: 'Farm not found' 
      });
    }

    res.json({
      success: true,
      message: 'Farm deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error while deleting farm',
      error: error.message 
    });
  }
};