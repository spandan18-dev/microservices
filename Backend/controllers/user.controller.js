const User = require('../Model/user.model');

async function register(req, res) {

    try {

        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !email || !password) {

            return res.status(400).json({
                msg: "All fields are required"
            });

        }

        const isAlreadyUser = await User.findOne({ email });

        if (isAlreadyUser) {

            return res.status(400).json({
                msg: "User already exists, try login"
            });

        }

        const hashedPassword = await User.hashPassword(password);

        const newUser = await User.create({

            fullname: {
                firstname,
                lastname
            },

            email,

            password: hashedPassword

        });

        const token = newUser.generateToken();
        return res.status(201).json({

            token,
            user: newUser

        });

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

}

async function login (req,res){

    try {

        const {email , password} = req.body;

        if (!email || !password) {

            return res.status(400).json({message : "All fields where required"})
        };

        const checkEmail = await User.findOne({email}).select('+password');

        if (!checkEmail) {

            return res.status(400).json({
                message : "User not Exist try regester"
            });

        }

        const checkPassword = await checkEmail.comparePassword(password);

        if (!checkPassword) {

            return res.status(400).json({
                message : "Incorrect email or password , try again "
            });
        }

        const token = await checkEmail.generateToken();

        res.status(200).json({
            message : "User login sucesfully",
            Token : token
        });

    } catch (err) {

        return res.status(500).json({
            error : err.message
        });

    }
};


module.exports = {
    register,
    login
}