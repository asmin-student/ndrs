const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');

// Get all incidents
router.get('/', async (req, res, next) => {
  try {
    const incidents = await Incident.findAll(req.query);
    res.json({
      status: 'success',
      data: {
        incidents
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get single incident
router.get('/:id', async (req, res, next) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({
        status: 'fail',
        message: 'Incident not found'
      });
    }
    res.json({
      status: 'success',
      data: {
        incident
      }
    });
  } catch (error) {
    next(error);
  }
});

// Create new incident
router.post('/', async (req, res, next) => {
  try {
    const incident = await Incident.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        incident
      }
    });
  } catch (error) {
    next(error);
  }
});

// Update incident
router.patch('/:id', async (req, res, next) => {
  try {
    const incident = await Incident.update(req.params.id, req.body);
    if (!incident) {
      return res.status(404).json({
        status: 'fail',
        message: 'Incident not found'
      });
    }
    res.json({
      status: 'success',
      data: {
        incident
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;