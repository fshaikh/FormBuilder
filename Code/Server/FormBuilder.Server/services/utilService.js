// All utilitiy functions go here

module.exports = (function () {
    
    const uuidV1 = require('uuid/v1');

    function getUniqueId() {
        return uuidV1();
    }

    return {
        getUniqueId: getUniqueId
    };
})();