const Otp = require('../models/otpModel');

const sendOtpController = (req, res, next) => {
    const { mobile } = req.body;
    if (mobile) {
        if (mobile.toString().length < 10) {
            res.status(400).json({ message: 'Invalid Mobile Number' });
        } else {
            const $otp = new Otp(mobile);
            $otp.setOtp()
                .then(() => res.status(201).json({ otp: $otp.otp }))
                .catch((err) => res.staus(500).json({ 'message': 'An error occured while generating otp' }));
        }
    } else {
        res.status(400).json({ message: 'Mobile Number is required' });
    }
}

const verifyOtpController = (req, res, next) => {
    const { mobile, otp } = req.body;
    if (mobile && otp) {
        if (mobile.toString().length < 10 && otp.toString().length < 4) {
            res.status(400).json({ message: 'Invalid Mobile Number or Otp' });
        } else {
            Otp.getOtp(mobile)
                .then(([rows]) => {
                    const result_otp = rows[0].otp;
                    if (otp === result_otp)
                        res.status(200).json({ message: 'Otp Verified' });
                    else
                        res.status(400).json({ message: 'Incorrect Otp' });
                })
                .catch(e => {
                    console.log('error', e)
                    res.status(500).json({ message: 'An error occured while generating otp' })
                });
        }
    } else {
        res.status(400).json({ message: 'Mobile Number and Otp is required' });
    }
}
module.exports = {
    sendOtpController,
    verifyOtpController
};