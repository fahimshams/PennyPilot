var express = require('express');
var router = express.Router();
var carRentalController = require('../controllers/carRentalsController');

// Route to search for flights
router.get('/', carRentalController.searchCarRentals);

module.exports = router;
