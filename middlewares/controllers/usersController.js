const Otp = require('../../models/otpModel');
const User = require('../../models/userModel');
const createError = require('../../helpers/createError');

const sendOtpController = (req, res, next) => {
    const { mobile } = req.body;
    const $otp = new Otp(mobile);
    $otp.setOtp()
        .then(() => res.status(201).json({ otp: $otp.otp }))
        .catch((err) => res.status(500).json({ 'message': 'An error occured while generating otp' }));
}

const verifyOtpController = (req, res, next) => {
    const { mobile, otp } = req.body;

    Otp.getOtp(mobile)
        .then(([rows]) => {
            const result_otp = rows[0].otp;
            if (otp === result_otp) {
                User.findOne({ mobile })
                    .then(([rows]) => {
                        // Return existing user.
                        if (rows[0].length) {
                            const data = rows[0][0];
                            const token = User.generateToken({ userId: data.user_id });
                            res.status(200).json({ user: data, token });
                        } else {
                            // Create User
                            const $user = new User(mobile);
                            $user.create()
                                .then(([rows]) => {
                                    const data = rows[0][0];
                                    const token = User.generateToken({ userId: data.user_id });
                                    res.status(201).json({ user: data, token });
                                })
                                .catch((err) => {
                                    console.log('err', err)
                                    createError(500, 'User cannot be created', res)
                                })
                        }
                    })
                    .catch((err) => {
                        console.log('err', err);
                        createError(500, 'User cannot be fetched', res)
                    })
            }
            else
                res.status(400).json({ message: 'Incorrect Otp' });
        })
        .catch(e => {
            console.log('error', e)
            res.status(500).json({ message: 'An error occured while generating otp' })
        });

}
module.exports = {
    sendOtpController,
    verifyOtpController
};