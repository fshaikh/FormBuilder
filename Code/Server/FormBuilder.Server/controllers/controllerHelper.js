// Helper module for controllers

module.exports = (function(){

    function handleResponse(res, response, getSuccessResponse,getErrorResponse) {
        response.isSuccess ? getSuccessResponse(res, response): getErrorResponse(res, response);
    }

    function getCreateResponse(res, payload) {
        // Set location header
        res.status(201).send(payload);
    }

    function getSuccessResponse(res, payload) {
        res.status(200).send(payload);
    }

    function getErrorResponse(res, response) {
        res.status(500).send(response);
    }

    function getUnauthorisedResponse(res,response){
        res.status(401).send('User not authorised')
    }

    function getNotFoundResponse(res,response){
        res.status(404).send(response);
    }

    return{
        handleResponse:handleResponse,
        getCreateResponse: getCreateResponse,
        getSuccessResponse: getSuccessResponse,
        getErrorResponse: getErrorResponse,
        getUnauthorisedResponse:getUnauthorisedResponse,
        getNotFoundResponse : getNotFoundResponse
    }
})();