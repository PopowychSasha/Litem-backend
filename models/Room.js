const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomName:{type:String},  
    messages:[
        {
            message:{type:String},
            userId:{type:String} //userId
        }
    ]
})

module.exports = mongoose.model('Room',roomSchema);