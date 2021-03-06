const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    nickname:{type:String,required:true},
    email:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    password:{type:String,required:true},
    
    roomsId:[{type:mongoose.Schema.Types.ObjectId,ref:'Room'}],

})

module.exports = mongoose.model('User',userSchema);