module.exports = (function () {
    var config = {};

    // environment related configuration
    config.env = {};
    //Cloud hosts(AWS, Azure,etc) use the PORT variable to tell you on which port your server should listen for the routing to work properly.
    // determine the port to listen on by checking PORT first and giving it a default value otherwise
    config.env.port = process.env.PORT || 4000;

    // mongodb related configuration
    config.mongodb = {};
    config.mongodb.host = "mongodb://127.0.0.1";
    config.mongodb.database = "cmsDb";
    config.mongodb.url = config.mongodb.host + "/" + config.mongodb.database;
    config.mongodb.formsCollection = "forms";
    config.mongodb.usersCollection = "users";

    // Token-based Authentication related configuration
    config.token = {};
    config.token.tokenProvider = "jwt";
    config.token.expiryMinutes = 24 * 60; // Expires in 24 hours
    config.token.signAlgorithm = 'HS256';

    // Password protection related configuration
    config.auth = {};
    config.auth.hashAlgo = 'sha256';

    return config;
})();


