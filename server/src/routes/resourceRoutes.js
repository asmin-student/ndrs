const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// Get all resources
router.get('/', async (req, res, next) => {
  try {
    const resources = await Resource.findAll(req.query);
    res.json({
      status: 'success',
      data: {
        resources
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get single resource
router.get('/:id', async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({
        status: 'fail',
        message: 'Resource not found'
      });
    }
    res.json({
      status: 'success',
      data: {
        resource
      }
    });
  } catch (error) {
    next(error);
  }
});

// Create new resource
router.post('/', async (req, res, next) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        resource
      }
    });
  } catch (error) {
    next(error);
  }
});

// Update resource
router.patch('/:id', async (req, res, next) => {
  try {
    const resource = await Resource.update(req.params.id, req.body);
    if (!resource) {
      return res.status(404).json({
        status: 'fail',
        message: 'Resource not found'
      });
    }
    res.json({
      status: 'success',
      data: {
        resource
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;