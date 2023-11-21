import joi from 'joi';
import { generalFields } from '../../middleware/validation.middileware.js';

export const signupSchema = joi.object({
  userName: joi.string().min(2).max(30).required().messages({
    'string.min': 'Username should have a minimum length of 2 characters',
    'string.max': 'Username should have a maximum length of 30 characters',
    'any.required': 'Username is required',
  }),
  email: generalFields.email.messages({
    'string.email': 'Invalid email address',
    'any.required': 'Email is required',
  }),
  password: generalFields.password.messages({
    'any.required': 'Password is required',
  }),
  phone: joi.string(),
  profileImage: joi.object().default(null),
  roles: joi.string().valid('admin', 'user').default('user'),
});


export const loginSchema = joi.object({
  
  email: generalFields.email.messages({
    'string.email': 'Invalid email address',
    'any.required': 'Email is required',
  }),
  password: generalFields.password.messages({
    'any.required': 'Password is required',
  }),

});


