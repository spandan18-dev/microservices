const express = require('express');
const router = express.Router();
const userController = require ('../Controllers/user.controller');
const auth = require('../Middlewares/auth.middleware');


router.post('/register',userController.register);

router.post('/login',userController.login);

router.get('/logout',userController.logout);

router.get('/profile', auth ,userController.profile)


module.exports = router;