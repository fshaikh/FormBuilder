// This middleware manages the authentication for the application


module.exports = (function () {
    var AUTH_TOKEN_HEADER = 'x-auth-token';
    const userService = require('../../services/userService.js');
    const authFactory = require('./auth-factory');

    async function handleAuthentication(req, res, next) {
        if (req.method === 'OPTIONS') {
            res.status(200).send();
            return;
        }
        // Server supports 2 types of authentication:
        // 1. Guest Authentication
        //       User is not present in the system. This is for users to try the application without creating account. In this case, we check the cookie
        // 2.   
        //      User has registered with username/password. Every API request must pass the auth token in the header (x-auth-token)
        var response = await authFactory.getAuthenticationProvider(req)(req, res);
        if (response.isSuccess) {
            req.user = response.data;
            next();
        } else {
            res.status(401).send(response);
        }
    }
    return {
        handleAuthentication: handleAuthentication
    };

})();