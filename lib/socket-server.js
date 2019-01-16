const server = require('./server');
const io = require('socket.io')(server.httpServer);
const User = require('../classes/user');
var socketIO = {};

// init user class
let userObj = new User();

// Socket Init
socketIO.init = function(){
    io.on('connection', function (socket) {
        console.log("connection done");
        onConnect(socket);
        onNewMessage(socket);
        onDisconnect(socket);
    });
}

/*
    when socket disconnect
*/
function onDisconnect(socket){
    socket.on('disconnect', function () {
        userObj.removeUser(socket.id);
        io.emit('newUser', userObj.getAllUsers());
        console.log("disconnect:", socket.id, 'onlineUser:', JSON.stringify(userObj.getAllUsers()));
    });
}

/*
    socket first event from client and get user details
*/
function onConnect(socket){
    socket.on('join', (user, callback)=>{
        user.id = socket.id;
    //   onlineUsers.push(user);
        userObj.addNewUser(user);
        callback(null, user);
        console.log("join:", user.id, "online:", userObj.getAllUsers());
        io.emit('newUser', userObj.getAllUsers());
    });
}

/*
    When client send the new Message
*/
function onNewMessage(socket){
    socket.on('newMessage', (param, callback)=>{
        emitNewMessage(socket, param);
    }) 
}

/*
    Send direct message to socket ID
*/
function emitNewMessage(socket, param){
    io.sockets.sockets[param.to].emit('sendMessage', param);
}

/*
    on Joining the room
*/
function onJoinRoom(socket){
    socket.on('joinRoom', (param, callback)=>{
        // logic to join new room
        // socket.join(roomname);
    });
}

module.exports = socketIO;