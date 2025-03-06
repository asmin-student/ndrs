const express = require('express');
const router = express.Router();
const Response = require('../models/Response');

// Get all responses
router.get('/', async (req, res, next) => {
  try {
    const responses = await Response.findAll(req.query);
    res.json({
      status: 'success',
      data: {
        responses
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get single response
router.get('/:id', async (req, res, next) => {
  try {
    const response = await Response.findById(req.params.id);
    if (!response) {
      return res.status(404).json({
        status: 'fail',
        message: 'Response not found'
      });
    }
    res.json({
      status: 'success',
      data: {
        response
      }
    });
  } catch (error) {
    next(error);
  }
});

// Create new response
router.post('/', async (req, res, next) => {
  try {
    const response = await Response.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        response
      }
    });
  } catch (error) {
    next(error);
  }
});

// Update response
router.patch('/:id', async (req, res, next) => {
  try {
    const response = await Response.update(req.params.id, req.body);
    if (!response) {
      return res.status(404).json({
        status: 'fail',
        message: 'Response not found'
      });
    }
    res.json({
      status: 'success',
      data: {
        response
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;