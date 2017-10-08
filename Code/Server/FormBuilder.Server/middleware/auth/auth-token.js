// Handles Token-based authentication

module.exports = (function () {
    var authHelper = require('./auth-helper');
    var ResponseBase = require('../../models/ResponseBase').ResponseBase;
    var jwtTokenProvider = require('../../services/jwtTokenProvider');

    // HTTP Header used for sending user id
    const AUTH_TOKEN_HEADER = 'x-auth-token';

    async function handleAuth(req, res) {
        var response = new ResponseBase();
        // Read the token from the header. 
        var authHeader = JSON.parse(authHelper.getHeader(req, AUTH_TOKEN_HEADER));
        var payload = await jwtTokenProvider.validateToken(authHeader.authToken);
        if (payload == null) {
            response.isSuccess = false;
            response.Error = 'Invalid Token.';
        } else {
            response.isSuccess = true;
            response.data = payload;
        }

        return response;
    }

    return {
        handleAuth: handleAuth,
        AUTH_TOKEN_HEADER: AUTH_TOKEN_HEADER
    };
})();