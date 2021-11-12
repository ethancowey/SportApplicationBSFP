const mongoose = require('mongoose');
const UserTable = require('../mongoDrivers/userTable')


async function loginUser(user) {
    await mongoose.connect('mongodb://mongo:27017', {
        useNewUrlParser: true
    }).then(() => {
        console.log('successfully connected to the database');
    }).catch(err => {
        console.log(err);
        console.log('error connecting to the database');
        process.exit();
    });
    const userSaved = await UserTable.findOne(user)
        .then(result => {
            return result
        })
    return userSaved
}

module.exports.loginUser = loginUser