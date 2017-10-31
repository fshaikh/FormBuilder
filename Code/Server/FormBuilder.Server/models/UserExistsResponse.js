module.exports = (function () {
    var ResponseBase = require('./ResponseBase').ResponseBase;
    function UserExistsResponse() {
        this.exists = false;
    }

    UserExistsResponse.prototype = Object.create(ResponseBase.prototype);
    UserExistsResponse.prototype.constructor = UserExistsResponse;

    return {
        UserExistsResponse: UserExistsResponse
    };
})();