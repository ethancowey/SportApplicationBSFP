const mongoose = require('mongoose')

const userPostsSchema = mongoose.Schema({
    username: {type: String,
        required: true
    },
    sport: {type: String,
        required: true
    },
    distance: {type: String},
    time: {type: String},
    description: {type: String},
    imageLink: {type: String}
})

module.exports = mongoose.model('UserPosts', userPostsSchema)