var http = require('http');
var server = {};

server.httpServer = http.createServer();

server.init = function(){
    server.httpServer.listen(3000, ()=>{
        console.log("server started on port: 3000");
    });
}

module.exports = server;