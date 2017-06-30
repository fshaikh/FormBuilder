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
    //config.mongodb.url = 'mongodb://fshaikh:fur1234@cluster0-shard-00-00-xnyl4.mongodb.net:27017,cluster0-shard-00-01-xnyl4.mongodb.net:27017,cluster0-shard-00-02-xnyl4.mongodb.net:27017/cmsDb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
    config.mongodb.formsCollection = "forms";
    config.mongodb.usersCollection = "users";

    return config;
})();


