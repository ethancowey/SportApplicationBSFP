/**
 * Defines the post object schema which can be used as a constructor by importing it as UserPosts.
 */
const mongoose = require('mongoose');

const userPostsSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	sport: {
		type: String,
		required: true
	},
	distance: { type: Number },
	time: { type: Number },
	description: { type: String },
	speedkph: { type: Number },
	speedmph: { type: Number },
	calories: { type: Number }

});

module.exports = mongoose.model('UserPosts', userPostsSchema);
