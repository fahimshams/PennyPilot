var express = require('express');
var router = express.Router();
var accomodationController = require('../controllers/accomodationController');

// Route to search for flights
router.get('/', accomodationController.searchHotels);

module.exports = router;
