const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        minlength: 5
    },
    favoriteGenre: {
        type: String,
        require: true,
    }


})

module.exports = mongoose.model('User', schema)