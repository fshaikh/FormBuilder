// This middleware manages the authentication for the application


module.exports = (function () {
    // HTTP Header used for sending user id
    var AUTH_HEADER = 'x-auth-userid';

    const userService = require('../../services/userService.js');

    async function handleAuth(req, res, next) {
        // a. Reads the userid (request.cookie or request.headers)
        let userId = _getCookie(req, AUTH_HEADER);

        req.user = await userService.getUser(userId);
        // Sets the response.header/response.cookie
        _setHeader(res, AUTH_HEADER, req.user.userId);
        _setCookie(res, AUTH_HEADER, req.user.userId);
 
        next();
    }

    function _getCookie(req, name) {
        return req.cookies[AUTH_HEADER];
    }
    function _getHeader(req,header) {
        // Read using either cookie or header. Current implementation uses header
        return req.headers[header];
    }

    function _setHeader(res, header, value) {
        res.header(AUTH_HEADER, value);
    }

    function _setCookie(res, header, value) {
        res.cookie(AUTH_HEADER, value);//, { httpOnly: true ,secure:true});
    }

    return {
        handleAuthentication: handleAuth
    };

})();