// Helper module for authentication middleware

module.exports = (function () {
    function _getCookie(req, name) {
        return req.cookies[name];
    }

    function _getHeader(req, header) {
        // Read using either cookie or header. Current implementation uses header
        return req.headers[header];
    }

    function _setHeader(res, header, value) {
        res.header(header, value);
    }

    function _setCookie(res, header, value) {
        res.cookie(header, value);//, { httpOnly: true ,secure:true});
    }

    return {
        getCookie: _getCookie,
        getHeader: _getHeader,
        setHeader: _setHeader,
        setCookie: _setCookie
    };
})();