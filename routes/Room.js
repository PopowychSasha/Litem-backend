const{Router} = require('express');
const RoomController = require('../controllers/Room');

const routes = Router();
routes.post('/api/auth/createRoom',RoomController.createRoom);
routes.post('/api/auth/sendMessage',RoomController.sendMessage);
routes.post('/api/auth/fetchMessages',RoomController.fetchMessages);
routes.post('/api/auth/fetchRooms',RoomController.fetchRooms);

module.exports = routes;