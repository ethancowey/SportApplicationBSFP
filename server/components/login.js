/**
 * Retrieves and returns the document if theres a matching user with that username. If it doesn't exist it returns false
 * so no login is authenticated by index.js. If i does exist using bcrypt the plain test password is compared with the
 * hashed password. If theres a match it returns true if not it returns false.
 *
 * @param {string} username the username to search the database for
 * @param {string} plainPassword the plaintext password to use bcrypt.compareSync() to check it matches the hashed password
 * @return {boolean} True if the password the user inputed matches the bcrypt hashed password stored. False if user does
 * not exist or the password does not match
 */
const mongoose = require('mongoose');
const UserTable = require('../mongoDrivers/userTable');
const bcrypt = require('bcryptjs');

async function loginUser (username, plainPassword) {
	await mongoose.connect('mongodb://mongo:27017', {
		useNewUrlParser: true
	}).then(() => {
		console.log('successfully connected to the database');
	}).catch(err => {
		console.log(err);
		console.log('error connecting to the database');
		process.exit();
	});
	const userAccount = await UserTable.findOne(username)
		.then(result => {
			return result;
		});
	if (userAccount === null) {
		return false;
	}
	const correctHash = bcrypt.compareSync(plainPassword, userAccount.password); // compare plaintext to password salt does not need saving
	return correctHash;
}

module.exports.loginUser = loginUser;
