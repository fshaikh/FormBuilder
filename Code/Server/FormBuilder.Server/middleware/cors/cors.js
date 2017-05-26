// This middleware manages CORS operations  

module.exports = (function () {
    function setupCors(req, res, next) {
        console.log('cors');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET,DELETE,POST");
        next();
    }

    return {
        setupCors: setupCors
    };
})();