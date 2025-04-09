const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errorHandler');
const validate = require('../middleware/validate');
const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
  role: Joi.string().valid(
    'admin', 
    'district_officer',
    'emergency_responder', 
    'resource_manager',
    'field_officer',
    'volunteer',
    'ngo_representative',
    'public_user'
  ).default('public_user'),
  organization: Joi.string().allow('', null).optional(),
  district: Joi.string().required(),
  phone: Joi.string().required().min(10),
  profile_picture: Joi.string().allow('', null).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required()
});

router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const { 
      name, 
      email, 
      password, 
      role, 
      organization, 
      phone, 
      district,
      profile_picture 
    } = req.body;

    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new AppError('Email already exists', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      organization,
      phone,
      district,
      profile_picture
    });

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          organization: user.organization,
          district: user.district,
          phone: user.phone,
          created_at: user.created_at
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          organization: user.organization,
          district: user.district
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;