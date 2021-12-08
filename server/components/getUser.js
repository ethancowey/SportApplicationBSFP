/**
 * Retrieves and returns the document if theres a matching user with that username.
 * This can be used to retrieve a users weight by index.js for calculating calories burned
 * This can also be used to retrieve a users favourite sport by index.js for ranking posts in postRanker.js
 * This is also used during registration to check if a user is unique or not
 *
 * @param {string} usernameInp the username to search the database for
 * @return {JSON} Document of the user with the input username if it exists.
 */
const mongoose = require('mongoose');
const UserTable = require('../mongoDrivers/userTable');

async function getUsername (usernameInp) {
	await mongoose.connect('mongodb://mongo:27017', {
		useNewUrlParser: true
	}).then(() => {
		console.log('successfully connected to the database');
	}).catch(err => {
		console.log(err);
		console.log('error connecting to the database');
		process.exit();
	});
	const userExists = await UserTable.findOne({ username: usernameInp })
		.then(result => {
			return result;
		});

	return userExists;
}

module.exports.getUsername = getUsername;
