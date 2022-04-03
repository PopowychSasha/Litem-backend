const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const UserRoutes = require('./routes/User');
const RoomRoutes = require('./routes/Room');

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json() );
app.get('/',(req,res,next)=>{
    res.json('Litem Backend');
})

app.use(UserRoutes);
app.use(RoomRoutes);

const start  =()=>{
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gzrnn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(()=>console.log('DB_CONNECTION_SUCCESS'))
    .catch(()=>console.log('DB_CONNECTION_FAILED'))

    const server = app.listen(process.env.PORT || 5000,()=>{
        console.log('Server is Started success!');
    })

    const io = require('socket.io')(server,{
        cors:{
            origin:'*'
        }
    })
    io.on('connection',(socket)=>{
        console.log(`User with id ${socket.id} is connected`);
        socket.on('disconnect',()=>{
            console.log(`User with id ${socket.id} disconnected`);
        })
        socket.on('join_room',(data)=>{
            console.log(`User with id ${socket.id} connect to room ${data.roomId}`);
            socket.join(data.roomId);
        })
        socket.on('send_message',(data)=>{
            console.log('data1');
            console.log(data);
            socket.to(data.roomId).emit('recive_message',{
                _id:data._id,
                message:data.message,
                room:data.room,
                roomId:data.roomId
            });
        })
    })
}

start();
