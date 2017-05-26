const http = require('http');
const path = require('path');

const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname + '/public')
const port = process.env.PORT || 3000

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// app.get('/home',(req,res)=>{
//     res.render('index.html');
// })

io.on('connection',(socket)=>{
    console.log("Connection established");

    

    socket.on('createChat',(message,callback)=>{
        socket.broadcast.emit('newChat', {
            text:message.text,
            from:message.from
        })
        callback('This is from server');
        // io.emit('newChat',{
        //     text:message.text,
        //     from:message.from
        // })
    })
})

server.listen(port,()=>{
    console.log("Server running on Port: 3000");
});