// All controllers are initialised here.
module.exports = (function () {
    
    // add require for each controllers here
    var formController = require('../controllers/form/formController.js');
    var authController = require('../controllers/auth/authController.js');

    /**
     * 
     * @param app
     * @param options
     */
    var _bootstrapControllers = function (app, options) {
        _setupBaseRoute(app,options);
        // set up middleware for authorisation. This will verify the token before the protected routes are hit.
        // Order is important here. Note that all account related routes are registered before this middleware since we dont want to protect those.
        formController.init(app, options);
    };


    var setupAuth = function(app,options){
         _setupBaseRoute(app,options);
        authController.init(app,options);
    };

    function _setupBaseRoute(app,options){
        // define the base route for all apis
        app.use('/api', options.router);
    }

    return {
        setupAuth:setupAuth,
        bootstrapControllers: _bootstrapControllers
    };
})();

// add require for each controllers here
