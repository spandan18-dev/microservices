const jwt = require('jsonwebtoken');
const User = require('../Models/user.model');

module.exports = async function auth (req,res,next){

    try {

        const token = req.cookie.Token || req.headers.authorization.split(' ')[1];

        if (!token) {

            return res.status(404).json({
                message : "Token not found"
            });
        };

        const decode = await jwt.verify(token , process.env.JWT);

        const user = await User.findById(decode._id);

        if (!user) {
            return res.status(400).json({
                message : "Unauthorized"
            });
        };

        req.user = user;

        next();
        
    } catch (err) {
        res.status(500).json({
            message : "Internal Server Error",
            error : err.message
        })
    }

}