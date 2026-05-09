const express = require('express');
const authRouter = express.Router();
const auth = require('../controllers/user.controller')
const {body} = require('express-validator')

authRouter.post('/register',[
    
    body("email")
        .isEmail()
        .notEmpty(),
    
],auth.register);

authRouter.post('/login',auth.login);


module.exports = authRouter;