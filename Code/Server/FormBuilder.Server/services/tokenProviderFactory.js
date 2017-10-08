// Factory for providing token provider

module.exports = (function () {
    var config = require('../infrastructure/config');

    /**
     * Gets the Token Provider based on the config setting. Returns null if no registered token provider
     */
    function getTokenProvider() {
        var tokenProviderType = config.token.tokenProvider;

        switch (tokenProviderType) {
            case "jwt":
                return require('./jwtTokenProvider');
            default:
                return null;
        }
    }

    return {
        getTokenProvider: getTokenProvider
    };
})();