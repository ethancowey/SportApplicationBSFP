const mongoose = require('mongoose')

const userTableSchema = mongoose.Schema({
    username: {type: String,
        required: true
    },
    password: {type: String,
        required: true
    }
})

module.exports = mongoose.model('UserTable', userTableSchema)