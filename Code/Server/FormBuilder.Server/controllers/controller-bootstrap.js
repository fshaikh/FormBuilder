// All controllers are initialised here.
module.exports = (function () {
    
    // add require for each controllers here
    var formController = require('../controllers/form/formController.js');
    //var formRouteConfig = require('../controllers/form/formRouteConfig.js');


    var _bootstrapControllers = function (app, options) {
        // define the base route for all apis
        app.use('/api', options.router);

        
        // set up middleware for authorisation. This will verify the token before the protected routes are hit.
        // Order is important here. Note that all account related routes are registered before this middleware since we dont want to protect those.


        formController.init(app, options);
        //formRouteConfig.defineRoutes(options.router, formController);
    };

    return {
        bootstrapControllers: _bootstrapControllers
    };
})();

// add require for each controllers here
