const jwt = require('jsonwebtoken');
const Captain = require('../Models/captain.model');

module.exports = async function auth (req,res,next){

    try {

        const token = req.cookies.Token || req.headers.authorization.split(' ')[1];

        if (!token) {

            return res.status(404).json({
                message : "Token not found"
            });
        };

        const decode = await jwt.verify(token , process.env.JWT);

        const captain = await Captain.findById(decode._id);

        if (!captain) {
            return res.status(400).json({
                message : "Unauthorized"
            });
        };

        req.captain = captain;

        next();
        
    } catch (err) {
        res.status(500).json({
            message : "Internal Server Error",
            error : err.message
        })
    }

}