const express = require('express');
const userController = require('../controllers/usersController');
const router = express.Router();

router.post('/send-otp', userController.sendOtpController);
router.post('/verify-otp', userController.verifyOtpController);

module.exports = router;