// All utilitiy functions go here

module.exports = (function () {
    var config = require('../infrastructure/config.js');
    const uuidV1 = require('uuid/v1');

    function getUniqueId() {
        return uuidV1();
    }

    /**
     * Returns the uri for connecting to mongo
     */
    function getMongoUrl(){
        // If deployed to PCF, use the environment variable
        var vcap = process.env.VCAP_SERVICES
        if(vcap){
             let vcap_services = JSON.parse(vcap)
             return vcap_services.mlab[0].credentials.uri;
        }else{
            return config.mongodb.url;
        }
    }

    return {
        getUniqueId: getUniqueId,
        getMongoUrl: getMongoUrl
    };
})();