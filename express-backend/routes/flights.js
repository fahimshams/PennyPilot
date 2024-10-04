var express = require('express');
var router = express.Router();
var flightController = require('../controllers/flightController');

// Route to search for flights
router.get('/searchFlights', flightController.searchFlights);

module.exports = router;
