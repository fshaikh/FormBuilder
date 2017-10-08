// Express bootstrapping goes here

module.exports = (function () {
    var express = require('express');
    // body-parser for json parsing used in POST/PUT. It extracts the body of an incoming HTTP request, parses based on one of the 4 strategies:
    // JSON,urlencoded,raw, text
    var bodyParser = require('body-parser');

    var cookieParser = require('cookie-parser');

    // require bootstrapper
    var bootstrapper = require('../controllers/controller-bootstrap.js');

    // logger middleware
    var logger = require('../middleware/logging/logger.js');

    // CORS middleware
    var cors = require('../middleware/cors/cors.js');

    // Authentication middleware
    var authMiddleware = require('../middleware/auth/auth-middleware.js');

    // Db
    var dbManager = require('../DAL/DataAccessBase');

    var _jsonParser;
    // express router object. This object is used for configuring api routes
    var _router = express.Router();

    // express applicaton object
    var _app;

    _init();

    async function _init() {
        // Create the express app
        _app = express();

        // Setup Angular bootstrap
        _setupAngularApps();

        // setup the middleware
        _setupRequestMiddleware();

        // Setup auth
        bootstrapper.setupAuth(_app, _getOptions());

        // Setup auth middleware
        _setupAuthMiddleware();

        // bootstrap controllers
        bootstrapper.bootstrapControllers(_app, _getOptions());

        // setup db connection
        let status = await dbManager.ConnectDb();
    }

    function _setupAngularApps() {
        // Setup the static files serving from node server. This will be processed before all routes.
        // The way this works is: Lets say we access styles.css from the browser. It will first look for styles.css in public folder. If it
        // finds it, file be server. If it is not found , it will then proceed to the configured routes

        // Set the index.html as the default document
        var options = {
            index: "index.html"
        };

        _app.use('/', express.static('public/formDesigner', options));
    }

    function _setupRequestMiddleware() {
        _setupBodyParsers();

        // setup cookie parser
        _app.use(cookieParser());

        // Setup logging
        _router.use(logger.log({ logHeader: false }));

        // Setup CORS
        _router.use(cors.setupCors);
    }

    function _setupAuthMiddleware(){
        // Setup Auth middleware
        _router.use(authMiddleware.handleAuthentication);
    }

    function _setupBodyParsers() {
        // Enable urlencoded to parse query string 
        _app.use(bodyParser.urlencoded({ extended: true }));
        // Enable JSON parsing. This allows the json posted in body of the request to be available in controllers
        _jsonParser = bodyParser.json();
        _app.use(_jsonParser);
    }

    function _setupCors() {
        _app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "GET,DELETE,POST");
            next();
        });
    }

    function _getOptions() {
        return {
            router: _router,
            jsonParser: _jsonParser
        };
    }

    return {
        app: _app
    };
})();