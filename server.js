
// Set up
var http = require('http');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var database = require('./config/database');

// Configuration 
mongoose.connect(database.url);
app.use(express.static(__dirname + '/public'));
//app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Load routes
require('./app/routes')(app);

// Run server
var server = http.createServer(app);
var port = process.env.PORT || 8080;
server.listen(port);

console.log("Listening on port " + port + "...")