var express = require('express');
var router = express.Router();
var mapBoxController = require('../controllers/mapBoxController');

// Route to search for flights
router.get('/', mapBoxController.suggestions);

module.exports = router;
