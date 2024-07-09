const Joi = require('joi');

exports.registerSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'any.required': 'First name field is required',
    'string.base': 'Field can only take texts',
  }),

  lastName: Joi.string().required().messages({
    'any.required': 'Last name field is required',
    'string.base': 'Field can only take texts',
  }),

  email: Joi.string().email().required().messages({
    'any.required': 'Email field is required',
    'string.email': 'Invalid email',
    'string.base': 'Field can only take texts',
  }),

  password: Joi.string()
    .required()
    .messages({ 'any.required': 'Password field is required' }),
  phone: Joi.string().optional().min(11),
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email field is required',
    'string.base': 'Invalid email or password',
    'string.email': 'Invalid email or password',
  }),

  password: Joi.string().required().messages({
    'any.required': 'Password field is required',
    'string.base': 'Invalid email or password',
  }),
});
