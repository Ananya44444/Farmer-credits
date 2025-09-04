const Joi = require('joi');

exports.validateRegistration = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(10).max(15).required(),
    password: Joi.string().min(6).required(),
    location: Joi.string().required()
  });

  return schema.validate(data);
};

exports.validateLogin = (data) => {
  const schema = Joi.object({
    phone: Joi.string().min(10).max(15).required(),
    password: Joi.string().required()
  });

  return schema.validate(data);
};

exports.validateFarm = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    size: Joi.number().min(0.1).required(),
    location: Joi.object({
      type: Joi.string().valid('Point').default('Point'),
      coordinates: Joi.array().items(Joi.number()).length(2).required()
    }).required(),
    cropType: Joi.string().valid('wheat', 'corn', 'rice', 'soybean', 'cotton', 'other').required(),
    season: Joi.string().valid('spring', 'summer', 'fall', 'winter').required(),
    practices: Joi.array().items(Joi.string().valid('no-till', 'cover-crops', 'organic', 'agroforestry', 'crop-rotation'))
  });

  return schema.validate(data);
};