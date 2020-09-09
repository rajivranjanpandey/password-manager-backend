const express = require('express');

const userRouter = require('./usersRouter');

const router = express.Router();

// Routes Declaration
router.use('/users', userRouter);

// On No Routes Match
router.use((req, res, next) => res.status(404).json({ message: 'Invalid Url' }));

module.exports = router;

