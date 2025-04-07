var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var { Server } = require('socket.io');
var io = new Server(server);

server.listen(3000, () => {
    console.log('Сервер запущено на порту 3000');
});

app.get('/', function (request, respons) {
    respons.sendFile(__dirname + '/index.html');
});

let users = [];
let connections = [];

io.sockets.on('connection', function (socket) { 
    console.log("Успішне приєднання");
    connections.push(socket);

    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1); 
        console.log("Відключилися");
    });

    socket.on('send mess', function(data) {
        io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
    });

});
