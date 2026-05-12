const rideModel = require('../Model/ride.model');
const { publishToQueue } = require('../Service/rabbit');

async function createRide(req, res,next) {
    try {
        const { pickup, destination } = req.body;

        if (!pickup || !destination) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const newRide = new rideModel({
            user: req.user._id,
            pickup,
            destination
        });

        await newRide.save();
        await publishToQueue("new-ride", JSON.stringify(newRide));
        return res.status(201).json(newRide);

    } catch (err) {
    console.log(err);

    return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
        stack: err.stack
    });
}
}

module.exports = {
    createRide
};