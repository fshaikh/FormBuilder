// Returns the auth strategy to use

module.exports = (function () {
    var authHelper = require('./auth-helper');
    var AuthenticationType = require('../../models/AuthType').AuthenticationType;

    // Determine the auth type to use based on criteria.
        // If x-auth-token header is present, use token-based auth
        // Else use guest authentication
        // a. Reads the userid (request.cookie or request.headers)
    function getAuthenticationProvider(req) {
        var authType = _getAuthType(req);
        switch (authType) {
            case AuthenticationType.Token:
                return require('./auth-token').handleAuth;
            case AuthenticationType.Guest:
                return require('./auth-guest').handleAuth;
        }
    }

    function _getAuthType(req) {
        var tokenHeader = authHelper.getHeader(req, require('./auth-token').AUTH_TOKEN_HEADER);
        return tokenHeader == null ? AuthenticationType.Guest : AuthenticationType.Token;
    }

    return {
        getAuthenticationProvider: getAuthenticationProvider
    };
})();