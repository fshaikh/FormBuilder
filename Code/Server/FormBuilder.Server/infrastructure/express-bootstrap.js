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

    var _jsonParser;
    // express router object. This object is used for configuring api routes
    var _router = express.Router();

    // express applicaton object
    var _app;

    _init();

    function _init() {
        // Create the express app
        _app = express();

        // setup the middleware
        _setupRequestMiddleware();

        // bootstrap controllers
        bootstrapper.bootstrapControllers(_app, _getOptions());
    }

    function _setupRequestMiddleware() {
        _setupBodyParsers();

        // setup cookie parser
        _app.use(cookieParser());

        // Setup logging
        _router.use(logger.log({ logHeader: false }));

        // Setup CORS
        _router.use(cors.setupCors);

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