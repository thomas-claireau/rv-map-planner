const express = require('express');
const router = express.Router();
const location = require('../controllers/location.controller');

// Create a new Location
router.post('/', location.create);

// Retrieve all Locations
router.get('/', location.findAll);

// Retrieve a single Location with locationId
router.get('/:locationId', location.findOne);

// Update a Location with locationId
router.put('/:locationId', location.update);

// Delete a Location with locationId
router.delete('/:locationId', location.delete);

module.exports = router;
