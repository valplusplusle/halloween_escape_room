var express = require("express");
var cors = require('cors');
var expressApp = express();
var bodyParser = require('body-parser')
var http = require('http');
var https = require('https');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
var ip = require("ip");
const fetch = require('node-fetch');
var serverIpAddress = "0.0.0.0"
const port = 8989;
const sound = require('sound-play')

expressApp.use(bodyParser.json({
    limit: '50mb'
}));

expressApp.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));

expressApp.use(cors());

const httpServer = http.createServer(expressApp);
httpServer.listen(port, () => {
    console.log('HTTP Server running on port '+ port);
    expressApp.use(express.static('./assets'))
});

// expressApp.use(express.static('../degaso-cash/dist/degaso-cash/'))

expressApp.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
});

// create wss for event calling
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
    server: httpServer
});

// ws broadcast function
wss.broadcast = function broadcast(msg) {
    wss.clients.forEach(function each(client) {
        client.send(msg);
    });
};

expressApp.get('/start', function (req, res, next) {
    wss.broadcast('playStartAudio');
    res.sendStatus(200);
})

expressApp.get('/horror1', function (req, res, next) {
    wss.broadcast('playhorror1');
    res.sendStatus(200);
})

expressApp.get('/horror2', function (req, res, next) {
    wss.broadcast('playhorror2');
    res.sendStatus(200);
})

expressApp.get('/horror3', function (req, res, next) {
    wss.broadcast('playhorror3');
    res.sendStatus(200);
})

expressApp.get('/horror4', function (req, res, next) {
    wss.broadcast('playhorror4');
    res.sendStatus(200);
})