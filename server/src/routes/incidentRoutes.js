const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');
const { auth, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const Joi = require('joi');

const incidentSchema = Joi.object({
  title: Joi.string().required().min(5),
  type: Joi.string().required().valid('flood', 'earthquake', 'landslide', 'fire', 'drought', 'avalanche', 'other'),
  location: Joi.string().required(),
  severity: Joi.string().required().valid('low', 'medium', 'high', 'critical'),
  description: Joi.string().required().min(10),
  affected_people: Joi.number().integer().min(0),
  status: Joi.string().valid('active', 'resolved')
});

router.get('/', auth, async (req, res, next) => {
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

router.get('/:id', auth, async (req, res, next) => {
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

router.post('/', [auth, validate(incidentSchema)], async (req, res, next) => {
  try {
    const incident = await Incident.create({
      ...req.body,
      reported_by: req.user.id
    });
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

router.patch('/:id', [auth, validate(incidentSchema)], async (req, res, next) => {
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