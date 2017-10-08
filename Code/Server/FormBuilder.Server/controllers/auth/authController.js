// Authentication Controller

module.exports = (function(){
    const controllerHelper = require('../controllerHelper');
    var authService = require('../../services/authService');

    var _init = function (app, options) {
        // add controller initialisation here
        _defineRoutes(options.router);
    }

    /**
     * Defines routes for the auth controller
     * @param router - Express Router object
     */
    var _defineRoutes = function(router){
        // POST api/auth/login
        router.route('/auth/login').post(doLogin);

        // POST api/auth/register
        router.route('/auth/register').post(doRegister);

        // POST api/auth/logoff
    }

    /**
     * Action method for login
     * @param req - Request object
     * @param res - Response object
     */
    // POST api/auth/login
    async function doLogin(req,res){
        let authInfo = req.body;
        var response = await authService.doLogin(authInfo);
        console.log(response);
        controllerHelper.handleResponse(res, response, controllerHelper.getSuccessResponse,controllerHelper.getUnauthorisedResponse);
    }

    /**
     * Action method for user registration
     * @param req - Request object
     * @param res - Response object
     */
    // POST api/auth/register
    async function doRegister(req, res) {
        let userInfo = req.body;
        var response = await authService.registerUser(userInfo);
        controllerHelper.handleResponse(res, response, controllerHelper.getCreateResponse, controllerHelper.getErrorResponse);
    }

    return{
        init:_init,
        doLogin: doLogin,
        doRegister: doRegister
    }
})();