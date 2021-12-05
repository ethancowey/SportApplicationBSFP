/**
 * Retrieves and returns all posts from the database to later be sorted and ranked from users tastes and the posts
 * performance.
 *
 * @return {JSON} Array of documents representing all of the posts.
 */
const mongoose = require('mongoose');
const PostTable = require('../mongoDrivers/userPosts')


async function getPosts () {
    await mongoose.connect('mongodb://mongo:27017', {
        useNewUrlParser: true
    }).then(() => {
        console.log('successfully connected to the database');
    }).catch(err => {
        console.log(err);
        console.log('error connecting to the database');
        process.exit();
    });
    const foundPosts = await PostTable.find()
        .then(result => {
            return result
        })
    return foundPosts
}

module.exports.getPosts = getPosts