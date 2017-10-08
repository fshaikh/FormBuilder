// Handles Guest Authentication

module.exports = (function () {
    var authHelper = require('./auth-helper');
    var ResponseBase = require('../../models/ResponseBase').ResponseBase;
    var userService = require('../../services/userService');

    // HTTP Header used for sending user id
    var AUTH_HEADER = 'x-auth-userid';

    async function handleAuth(req, res) {
        var response = new ResponseBase();
        let userId = authHelper.getCookie(req, AUTH_HEADER);

        let user = await userService.getUser(userId);

        // Sets the response.header/response.cookie
        authHelper.setHeader(res, AUTH_HEADER, user.userId);
        authHelper.setCookie(res, AUTH_HEADER, user.userId);

        response.isSuccess = true;
        response.data = user;

        return response;
    }

    return {
        handleAuth: handleAuth
    };
})();