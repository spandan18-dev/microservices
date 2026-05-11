const express = require('express');
const router = express.Router();
const authmiddleware = require('../Middlewares/auth.middleware');
const rideController = require('../Controllers/ride.controller');

router.post('/create-ride',authmiddleware.auth,rideController.createRide)

module.exports = router