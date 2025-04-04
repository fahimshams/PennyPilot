var express = require('express');
var router = express.Router();
var privateCarsController = require('../controllers/privateCarsController');

// Route to search for private cars
router.get('/', privateCarsController.searchPrivateCars);

module.exports = router; 