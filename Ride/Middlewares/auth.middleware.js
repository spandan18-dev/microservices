const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports = async function auth (req,res,next) {

    try {
        
        const token = req.cookies.Token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({
                message : "Unauthorize"
            });
        };

        const decode =  jwt.verify(token,process.env.JWT);

        if (!decode) {
            return res.status(400).json({
                message : "Unauthorize"
            });
        };

        const response = await axios.get(
            `${process.env.BASEURL}/profile`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const user = response.data;
        if (!user) {
            return res.status(400).json({
                message : "Unauthorize"
            });
        };

        req.user = user ;
        next();



    } catch (err) {
        res.status(500).json({
            message : "Internal Server error",
            error : err.message
        })
    }
}