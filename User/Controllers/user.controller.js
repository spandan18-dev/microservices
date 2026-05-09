const User = require('../Models/user.model')
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

        const isUser = await User.findOne({email : email});

        if (isUser) {
            return res.status(400).json({
                message : "User alredy exist"
            });
        };

        const hashPassword = await bcrypt.hash(password ,10);

        const user = await User.create({
            name,
            email,
            password : hashPassword
        });

        const token = await jwt.sign({_id:user._id},process.env.JWT);

        res.status(200).json({
            message : "User register",
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


async function login (req,res) {

    try {

        const {email,password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message : "All fields are required"
            });
        };

        const user = await User.findOne({email}).select('+password');

        if (!user) {
            return res.status(400).json({
                message : "User does't exist"
            });
        };

        const checkPass = await bcrypt.compare(password , user.password);

        if (!checkPass) {
            return res.status(400).json({
                message : "Incorrect email or password"
            });
        };

        const token = await jwt.sign({_id:user._id},process.env.JWT);

        res.status(200).json({
            message : "User logined",
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

module.exports = {
    register,
    login
}