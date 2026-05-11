const express = require('express');
const router = express.Router();
const CaptainController = require ('../Controllers/captain.controller');
const auth = require('../Middlewares/auth.middleware');


router.post('/register',CaptainController.register);

router.post('/login',CaptainController.login);

router.get('/logout',CaptainController.logout);

router.get('/profile', auth ,CaptainController.profile);

router.put('/avalable' ,auth, CaptainController.isAvalable)


module.exports = router;