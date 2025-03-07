const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

// Get all alerts
router.get('/', async (req, res, next) => {
  try {
    const alerts = await Alert.findAll(req.query);
    res.json({
      status: 'success',
      data: {
        alerts
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get single alert
router.get('/:id', async (req, res, next) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({
        status: 'fail',
        message: 'Alert not found'
      });
    }
    res.json({
      status: 'success',
      data: {
        alert
      }
    });
  } catch (error) {
    next(error);
  }
});

// Create new alert
router.post('/', async (req, res, next) => {
  try {
    const alert = await Alert.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        alert
      }
    });
  } catch (error) {
    next(error);
  }
});

// Update alert
router.patch('/:id', async (req, res, next) => {
  try {
    const alert = await Alert.update(req.params.id, req.body);
    if (!alert) {
      return res.status(404).json({
        status: 'fail',
        message: 'Alert not found'
      });
    }
    res.json({
      status: 'success',
      data: {
        alert
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;