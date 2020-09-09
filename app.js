const express = require('express');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');

// configure dotEnv
dotEnv.config();
// Self Imports
const routes = require('./routes');

// Setup Express App
const app = express();

// middlewares.
app.use(bodyParser.json());
app.use(routes);

// start server
app.listen(process.env.PORT, () => console.log(`Server Started On Port : ${process.env.PORT}`));

