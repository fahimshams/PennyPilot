var express = require('express');
var router = express.Router();
var activitiesController = require('../controllers/activitiesController');

// Route to search for flights
router.get('/', activitiesController.searchActivities);


module.exports = router;
