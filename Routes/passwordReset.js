const express =require('express');
const router = express.Router();
const {forgotPassword, resetPassword} = require('../controllers/passwordResetControllers');

//This is the route for intiating password reset

router.post('/forgot-password', passwordResetController.forgotPassword);

//This is the route for handling password reset

router.post('/reset-password', passwordResetControllers.resetPassword);

module.exports = router;
