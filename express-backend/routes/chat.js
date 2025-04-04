var express = require('express');
var router = express.Router();
var chatController = require('../controllers/chatController');

router.post('/process', chatController.processMessage);
router.post('/weather-activities', chatController.getWeatherAndActivities);

module.exports = router; 