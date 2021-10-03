const mongoose = require('mongoose')

const filteredtableSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    umsatz:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },

})

module.exports = mongoose.model('filteredtable', filteredtableSchema)