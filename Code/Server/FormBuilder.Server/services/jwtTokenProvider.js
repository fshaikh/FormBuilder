// Token provider for JWT

module.exports = (function () {
    var jwt = require('jsonwebtoken');
    var config = require('../infrastructure/config');

    /**
     * Returns the JWT Token 
     * @param payload - Claims to be added to JWT
     */
    async function getToken(payload) {
        var token = await jwt.sign(payload,      // payload
                            _getSecret(),        // Secret to be used when signing the token. Read from the environment variable
                            {
                                expiresIn: config.token.expiryMinutes, // Token expires in 24 hours by default
                                algorithm: config.token.signAlgorithm  // Signing algorithm to be used for signing the token
                            }); 

        return token;
    }

    /**
     * Valdidates the JWT token
     * @param token - JWT token
     */
    async function validateToken(token) {
        var payload = null;
        try {
            payload = jwt.verify(token,             // JWT token
                                _getSecret(),       // shared secret 
                                { algorithm: config.token.signAlgorithm });
        } catch (e) {
            console.error(`Invalid token`);
        }
        return payload;
    }

    function _getSecret() {
        // Read the secret from the environment variable
        return process.env.TOKEN_SECRET || 'pass1234';
    }

    return {
        getToken: getToken,
        validateToken: validateToken
    }

})();