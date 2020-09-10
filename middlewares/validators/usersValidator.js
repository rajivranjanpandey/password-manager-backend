const Joi = require('joi');
const createError = require('../../helpers/createError');

const validateSendOtpInput = (req, res, next) => {
    const schema = Joi.object().keys({
        mobile: Joi.string().trim().regex(/^[0-9]{10}$/).required()
    });
    schema.validateAsync(req.body)
        .then(() => next())
        .catch((err) => createError(400, err.details[0].message, res));
}
const validateVerifyOtpInput = (req, res, next) => {
    const schema = Joi.object().keys({
        mobile: Joi.string().trim().regex(/^[0-9]{10}$/).required(),
        otp: Joi.number().min(4).required()
    }).with('mobile', 'otp');
    schema.validateAsync(req.body)
        .then(() => next())
        .catch((err) => createError(400, err.details[0].message, res));
}

module.exports = { validateSendOtpInput, validateVerifyOtpInput };