const Room = require('../models/Room');
const User = require('../models/User');

exports.createRoom = async (req,res,next)=>{
     const{roomName,myId,freandId,freandNick} = req.body;
     console.log(`freandNick=${freandNick}`);
     const chatFreand = await User.findOne({nickname:freandNick});
     if(!chatFreand){
        res.status(404).json({message:'User not found'});
     }
     else{
        const createdRoom = new Room({
            roomName:roomName
        })
   
        await createdRoom.save();
   
        await User.updateOne({_id:myId},{$push:{'roomsId':createdRoom._id}})
   
        await User.updateOne({nickname:freandNick},{$push:{'roomsId':createdRoom._id}})
        res.status(200).json(createdRoom);
     }
}

exports.sendMessage = async (req,res)=>{
    const{message,userId,roomId} = req.body;
    
    await Room.updateOne({_id:roomId},{$push:{messages:{message:message,userId:userId}}})
    
    res.json('Message was send !!!');
}

exports.fetchMessages = async (req,res)=>{
    const{roomId} = req.body;
    
    const room = await Room.findOne({_id:roomId});
    
   
    res.json(room);
}

exports.fetchRooms = async (req,res)=>{
    const{_id} = req.body;
    
    const user = await User.findOne({_id:_id});
    const userRoomsId = user.roomsId;

    let userRooms = await Room.find({_id:{$in:[...userRoomsId]}})
    userRooms = userRooms.reverse();
    console.log(userRooms);

    res.json(userRooms);
}