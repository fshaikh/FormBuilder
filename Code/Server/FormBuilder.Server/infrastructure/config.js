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
    //config.mongodb.url = 'mongodb://fshaikh:fur1234@cluster0-shard-00-00-xnyl4.mongodb.net:27017,cluster0-shard-00-01-xnyl4.mongodb.net:27017,cluster0-shard-00-02-xnyl4.mongodb.net:27017/cmsDb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
    config.mongodb.formsCollection = "forms";
    config.mongodb.usersCollection = "users";

    return config;
})();


