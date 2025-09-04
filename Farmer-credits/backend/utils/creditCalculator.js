exports.calculateCarbonCredits = (size, cropType, practices = []) => {
  let baseRate = 2.0;
  
  const cropMultipliers = {
    'wheat': 1.0,
    'corn': 1.2,
    'rice': 0.8,
    'soybean': 1.1,
    'cotton': 0.9,
    'other': 1.0
  };
  
  baseRate *= cropMultipliers[cropType] || 1.0;
  
  let practiceBonus = 0;
  if (practices.includes('no-till')) practiceBonus += 0.3;
  if (practices.includes('cover-crops')) practiceBonus += 0.2;
  if (practices.includes('organic')) practiceBonus += 0.4;
  if (practices.includes('agroforestry')) practiceBonus += 0.5;
  if (practices.includes('crop-rotation')) practiceBonus += 0.2;
  
  const finalRate = baseRate + practiceBonus;
  const totalCredits = Number(size || 0) * finalRate;
  
  return parseFloat(totalCredits.toFixed(1));
};