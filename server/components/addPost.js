/**
 * Posts a users post to the post table in the mongoDB database and returns the post added.
 *
 * @param {JSON} Document to be added to the database.
 * @return {JSON} Document that was added to the database.
 */
const mongoose = require('mongoose');
const PostTable = require('../mongoDrivers/userPosts')


async function postDB (post) {
    await mongoose.connect('mongodb://mongo:27017', {
        useNewUrlParser: true
    }).then(() => {
        console.log('successfully connected to the database');
    }).catch(err => {
        console.log(err);
        console.log('error connecting to the database');
        process.exit();
    });
    const newPost = new PostTable(post)
    const postSaved = await newPost.save()
        .then(result => {
            return result
        })
    return postSaved
}

module.exports.postDB = postDB