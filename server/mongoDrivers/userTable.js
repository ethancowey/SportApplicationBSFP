const mongoose = require('mongoose')

const userTableSchema = mongoose.Schema({
    username: {type: String,
        required: true
    },
    password: {type: String,
        required: true
    },
    weight: {
        type: Number,
        required: false
    },
    favouriteSport: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('UserTable', userTableSchema)