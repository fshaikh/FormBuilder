// This is a middleware for logging all HTTP requests along with their timestamp

module.exports = (function () {

   // This middleware accepts user-defined arguments. Uses factory function
    function log(options) {
        return function(req, res, next) {
            // log the request
            console.log("Request for: " + req.url);

            if (options.logHeader) {
                // inspect headers
                let headers = req.headers;
                for (let header in headers) {
                    console.log(`${header} : ${headers[header]}`);
                }
            }

            
            
            // call the next middleware 
            next();
        }
    }


    return {
        log:log
    };
})();