const Farm = require('../models/Farm');
const Transaction = require('../models/Transaction');

exports.getCreditsSummary = async (req, res) => {
  try {
    const farmerId = req.user.id;

    const farms = await Farm.find({ farmer: farmerId, isActive: true });
    
    const totalCredits = farms.reduce((sum, farm) => sum + farm.carbonCredits, 0);
    const estimatedValue = totalCredits * 25;
    
    const transactions = await Transaction.find({ farmer: farmerId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        totalCredits,
        estimatedValue,
        farmCount: farms.length,
        transactions
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching credit summary',
      error: error.message 
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const farmerId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const transactions = await Transaction.find({ farmer: farmerId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Transaction.countDocuments({ farmer: farmerId });

    res.json({
      success: true,
      data: {
        transactions,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching transactions',
      error: error.message 
    });
  }
};

exports.sellCredits = async (req, res) => {
  try {
    const farmerId = req.user.id;
    const { creditsToSell } = req.body;

    const farms = await Farm.find({ farmer: farmerId, isActive: true });
    const totalCredits = farms.reduce((sum, farm) => sum + farm.carbonCredits, 0);

    if (creditsToSell > totalCredits) {
      return res.status(400).json({ 
        success: false, 
        message: 'Not enough credits available' 
      });
    }

    const amount = creditsToSell * 25;

    const transaction = new Transaction({
      farmer: farmerId,
      type: 'credit',
      amount,
      description: `Sale of ${creditsToSell} carbon credits`,
      status: 'completed',
      reference: `CREDIT_${Date.now()}`
    });

    await transaction.save();

    res.json({
      success: true,
      message: 'Credit sale completed successfully',
      data: { transaction }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error during credit sale',
      error: error.message 
    });
  }
};