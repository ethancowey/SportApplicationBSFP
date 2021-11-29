const mongoose = require('mongoose');
const UserTable = require('../mongoDrivers/userTable')
const bcrypt = require('bcryptjs')


async function loginUser(username, plainPassword) {
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
            return result
        })
    const correctHash = bcrypt.compareSync(plainPassword, userAccount.password); //compare plaintext to password salt does not need saving
    return correctHash
}

module.exports.loginUser = loginUser