var http = require('http');
var appBootstrap = require('./app-bootstrap.js');
var config = require('./config.js');

// Start the server
startServer();

function startServer() {
    // Create server
    var server = http.createServer(appBootstrap.app);
    // start listening
    server.listen(config.env.port);
}