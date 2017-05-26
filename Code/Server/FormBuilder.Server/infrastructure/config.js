module.exports = (function () {
    var config = {};

    // environment related configuration
    config.env = {};
    config.env.port = 4000;

    // mongodb related configuration
    config.mongodb = {};
    config.mongodb.host = "mongodb://localhost";
    config.mongodb.database = "cmsDb";
    config.mongodb.url = config.mongodb.host + "/" + config.mongodb.database;
    config.mongodb.formsCollection = "forms";
    config.mongodb.usersCollection = "users";

    return config;
})();


