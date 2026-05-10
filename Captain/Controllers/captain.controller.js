const Captain = require('../Models/captain.model')
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

async function register (req,res) {

    try {

        const {name , email , password} = req.body;

        if (!name || !email || !password){
            return res.status(400).json({
                message : "All fields are required"
            });
        };

        const isCaptain = await Captain.findOne({email : email});

        if (isCaptain) {
            return res.status(400).json({
                message : "Captain alredy exist"
            });
        };

        const hashPassword = await bcrypt.hash(password ,10);

        const captain = await Captain.create({
            name,
            email,
            password : hashPassword
        });

        const token = await jwt.sign({_id:captain._id},process.env.JWT);

        res.cookie('Token',token)

        res.status(200).json({
            message : "Captain register",
            Token : token
        });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message : "Internal Server Error",
            error : err.message
        });
    }

};


async function login (req,res) {

    try {

        const {email,password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message : "All fields are required"
            });
        };

        const captain = await User.findOne({email}).select('+password');

        if (!captain) {
            return res.status(400).json({
                message : "Captain does't exist"
            });
        };

        const checkPass = await bcrypt.compare(password , captain.password);

        if (!checkPass) {
            return res.status(400).json({
                message : "Incorrect email or password"
            });
        };

        const token = await jwt.sign({_id:captain._id},process.env.JWT);

        res.cookie('Token',token);

        res.status(200).json({
            message : "Captain logined",
            Token : token
        });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message : "Internal Server Error",
            error : err
        });
    }

};

async function logout (req,res){

    try {
        
        const token = req.cookies.Token ;

        res.clearCookie('token');

        res.status(201).json({
            message :"Captain logout sucesfully"
        })

    } catch (err) {
        
        res.status(500).json({
            message : err.message
        })

    }

};

async function profile (req,res) {

    try {
        
        res.send(req.captain)

    } catch (err) {
        res.status(500).json({
            message : "Server error "
        });
    };

}

module.exports = {
    register,
    login,
    logout,
    profile
}