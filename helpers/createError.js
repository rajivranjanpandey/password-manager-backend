module.exports = function createError(statusCode, message, res) {
    res.status(statusCode).json({ message });
}