const mongoose = require('mongoose');
const UserTable = require('../mongoDrivers/userTable');

async function getUsername(usernameInp){
    await mongoose.connect('mongodb://mongo:27017', {
        useNewUrlParser: true
    }).then(() => {
        console.log('successfully connected to the database');
    }).catch(err => {
        console.log(err);
        console.log('error connecting to the database');
        process.exit();
    });
    const userExists = await UserTable.findOne({username: usernameInp})
        .then(result => {
            return result
        })

    return userExists
}

module.exports.getUsername = getUsername