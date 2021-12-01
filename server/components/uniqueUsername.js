const mongoose = require('mongoose');
const UserTable = require('../mongoDrivers/userTable');

async function isUnique(usernameInp){
    await mongoose.connect('mongodb://mongo:27017', {
        useNewUrlParser: true
    }).then(() => {
        console.log('successfully connected to the database');
    }).catch(err => {
        console.log(err);
        console.log('error connecting to the database');
        process.exit();
    });
    const newUsername = await UserTable.findOne({username: usernameInp})
        .then(result => {
            return result
        })

    return newUsername
}

module.exports.isUnique = isUnique