var server = require("./lib/server");
var socket = require("./lib/socket-server");

var app = {};

app.init = function(){

  server.init();

  socket.init();

}

app.init();

module.exports = app;