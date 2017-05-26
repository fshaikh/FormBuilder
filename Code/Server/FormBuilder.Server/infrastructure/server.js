var http = require('http');
var expressBootstrap = require('./express-bootstrap.js');
var config = require('./config.js');

// Start the server
startServer();

function startServer() {
    // Create server
    var server = http.createServer(expressBootstrap.app);
    // start listening
    server.listen(config.env.port);
}