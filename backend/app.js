const express = require('express');
const path = require('path');
const cors = require('cors');

// Security Imports
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

// Routes Imports
const locations = require('./routes/location.route');

// Express app launching
const app = express();

// Helmet middlware for safe headers
app.use(helmet());
app.use(cors());

// express-rate-limit middleware to limit the amount of request done
const limiter = rateLimit({
	windowMs: 30 * 60 * 1000,
	max: 100,
});
app.use(limiter);

// Setting CORS headers
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Content-Type, Access-Control-Allow-Headers'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	);
	next();
});

// Parsing req
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security
app.use(hpp()); // HPP middleware to protect against HTTP parameter pollution attacks

// Setting routes
app.use('/locations', locations);

// Exporting module
module.exports = app;
