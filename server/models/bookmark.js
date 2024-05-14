const mongoose = require("mongoose")

const bookMark = new mongoose.Schema({
    title: {
        type: String, 
    },
    description: {
        type: String
    },
    image: {
        type: String
    },

})
module.exports = bookMark
