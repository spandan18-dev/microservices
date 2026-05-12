const express = require('express');
const router = express.Router();

const authMiddleware = require('../Middlewares/auth.middleware');

const rideController = require('../Controllers/ride.controller');

router.post(
    '/create-ride',
    authMiddleware,
    rideController.createRide
);

module.exports = router;