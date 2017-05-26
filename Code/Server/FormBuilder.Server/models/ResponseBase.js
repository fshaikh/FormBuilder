module.exports = (function () {
    function ResponseBase() {
        this.isSuccess = true;
        this.message = '';
        this.data = {};
    }

    return {
        ResponseBase: ResponseBase
    };
})();