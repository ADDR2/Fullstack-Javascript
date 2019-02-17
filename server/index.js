const initController = require('./controllers/initController');

function start() {
	console.log('Connected to server :)');
	/* 3rd party libraries */
	const express = require("express");
	const bodyParser = require("body-parser");
	const app = express();

	/* Import routes */
	const adminRoutes = require('./routes/admin');
	const userRoutes = require('./routes/user');
	const restaurantRoutes = require('./routes/restaurant');

	const PORT = process.env.PORT || 3000;

	/* Body parser to read json */
	app.use(bodyParser.json());
	/* Frontend */
	app.use(express.static('public'));

	/* Define routes */
	app.use("/admin", adminRoutes);
	app.use("/user", userRoutes);
	app.use("/restaurant", restaurantRoutes);

	app.listen(PORT, () => {
		console.log('Express server is up on port ' + PORT);
	});

	return app;
}

function error() {
	console.log('Something went wrong trying to connect :/');
}

initController.on('start', start);
initController.on('end', error);