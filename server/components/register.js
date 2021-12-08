/**
 * Adds a new user to the user table to the mongoDB database.
 *
 * @param {JSON} Document of the user to be added to the database
 * @return {JSON} Document of the user added
 */
const mongoose = require('mongoose');
const UserTable = require('../mongoDrivers/userTable');

async function registerUser (user) {
	await mongoose.connect('mongodb://mongo:27017', {
		useNewUrlParser: true
	}).then(() => {
		console.log('successfully connected to the database');
	}).catch(err => {
		console.log(err);
		console.log('error connecting to the database');
		process.exit();
	});
	const newUser = new UserTable(user);
	const userSaved = await newUser.save()
		.then(result => {
			return result;
		});
	return userSaved;
}

module.exports.registerUser = registerUser;
