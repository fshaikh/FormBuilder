// Forms Controller. 

module.exports = (function () {
    const formService = require('../../services/formService.js');
    const FormRequest = require('../../models/FormRequest.js');
    
    var _init = function (app, options) {
        // add controller initialisation here
        _defineRoutes(options.router);
    }

    var _defineRoutes = function (router) {
        // GET /api/form/ping
        router.route('/form/ping').get(ping);

        // POST /api/form/meta
        router.route('/form/meta').post(saveFormMeta);

        // GET /api/form/meta/{id}
        router.route('/form/meta/:id').get(getFormMeta);

        // GET /api/forms/{includeMeta}
        router.route('/forms/:includeMeta').get(getForms);

        // DELETE /api/form/meta/{id}
        router.route('/form/meta/:id').delete(deleteFormMeta);
    }

    // GET /api/form/ping
    async function ping(req, res,next) {
        res.status(200).send({ done: 'Hurray' });
    }


    // POST /api/form/meta
    //@Route('GET','api/form/meta')

    async function saveFormMeta(req, res) {
        let form = req.body;
        let response = await formService.saveFormMeta(form);
        _handleResponse(res, response);
    }

    // GET /api/form/meta/{id}
    async function getFormMeta(req, res) {
        let formId = req.params.id;

        let formRequest = new FormRequest.FormRequest(formId, '');
        let response = await formService.getFormMeta(formRequest);

        _handleResponse(res, response);
    } 

    // GET /api/forms/{includeMeta}
    async function getForms(req, res) {
        let includeMeta = req.params.includeMeta == '1' ? true : false;
        let formRequest = new FormRequest.FormRequest('', '', includeMeta,req.user);

        let response = await formService.getForms(formRequest);

        _handleResponse(res, response);
    }

    // DELETE /api/form/meta/{id}
    async function deleteFormMeta(req, res) {
        res.status(204).send('deleted successfully');
    }

    function _handleResponse(res, response) {
        if (response.isSuccess) {
            getCreateResponse(res, response);
        } else {
            getErrorResponse(res, response);
        }
    }

    function getCreateResponse(res,payload) {
        res.status(201).send(payload);
    }

    function getSuccessResponse(res, payload) {
        res.status(200).send(payload);
    }

    function getErrorResponse(res, response) {
        res.status(500).send(response);
    }


    return {
        init : _init,
        saveFormMeta: saveFormMeta,
        getFormMeta: getFormMeta
    };
})();