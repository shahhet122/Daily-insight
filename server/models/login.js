const mongoose = require('mongoose')
const bookedMark = require('./bookmark')

const login = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    bookmark : [bookedMark]
})

const verify = mongoose.model('login',login)

// export
module.exports = verify      