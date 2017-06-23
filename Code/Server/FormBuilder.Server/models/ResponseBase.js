module.exports = (function () {
    function ResponseBase() {
        this.isSuccess = true;
        this.message = '';  // Success/Error message
        this.data = {}; // Payload
        this.errors = [];
    }

    return {
        ResponseBase: ResponseBase
    };
})();