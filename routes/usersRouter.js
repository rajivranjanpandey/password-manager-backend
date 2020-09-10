const express = require('express');
const usersController = require('../middlewares/controllers/usersController');
const usersValidator = require('../middlewares/validators/usersValidator');

const router = express.Router();

router.post('/send-otp', usersValidator.validateSendOtpInput, usersController.sendOtpController);
router.post('/verify-otp', usersValidator.validateVerifyOtpInput, usersController.verifyOtpController);

module.exports = router;