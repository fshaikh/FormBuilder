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

    /**
     * Converts the input buffer to base64-encoded string
     * @param {*Buffer} buffer 
     */
    function toBase64String(buffer){
        // convert to base64-encoded string format
        return buffer.toString('base64',0,buffer.length);
    }

    /**
     * Converts base64-encoded string to Buffer
     * @param inputStr
     */
    function fromBase64String(inputStr) {
        return Buffer.from(inputStr, 'base64');
    }

    /**
     * Converts 
     */
    function toBytes(input){
        return new Buffer(input);
    }

    /**
     * Combines the buffers passed in the arguments list. This is a variadic function
     */
    function combineBuffer(...buffers){
        var totalLength = buffers.reduce((total, current) => {
            return total.length + current.length;
        });
        return Buffer.concat(buffers,totalLength);
    }

    return {
        getUniqueId: getUniqueId,
        getMongoUrl: getMongoUrl,
        toBase64String: toBase64String,
        fromBase64String: fromBase64String,
        toBytes: toBytes,
        combineBuffer: combineBuffer
    };
})();