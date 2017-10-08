// This middleware manages CORS operations  

module.exports = (function () {
    function setupCors(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:4200");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Credentials,x-auth-token");
        res.header("Access-Control-Allow-Methods", "GET,DELETE,POST");
        res.header('Access-Control-Allow-Credentials', true);
        next();
    }

    return {
        setupCors: setupCors
    };
})();