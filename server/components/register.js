const mongoose = require('mongoose');
const UserTable = require('../mongoDrivers/userTable')


async function registerUser(user) {
    await mongoose.connect('mongodb://mongo:27017', {
        useNewUrlParser: true
    }).then(() => {
        console.log('successfully connected to the database');
    }).catch(err => {
        console.log(err);
        console.log('error connecting to the database');
        process.exit();
    });
    //mongoose.connect('mongodb://mongodb:27017')
   //     .then()
    const newUser = new UserTable(user)
    const userSaved = await newUser.save()
        .then(result => {
            return result
        })
    return userSaved
}

module.exports.registerUser = registerUser