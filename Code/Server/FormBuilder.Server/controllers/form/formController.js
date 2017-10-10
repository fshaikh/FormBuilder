// Forms Controller. 

module.exports = (function () {
    const formService = require('../../services/formService.js');
    const FormRequest = require('../../models/FormRequest.js');
    const controllerHelper = require('../controllerHelper');
    
    var _init = function (app, options) {
        // add controller initialisation here
        _defineRoutes(options.router);
    }

    /**
     * Defines routes for the form controller
     * @param router - Express Router object
     */
    var _defineRoutes = function (router) {
        // GET /api/form/ping
        router.route('/form/ping').get(ping);

        // POST /api/form/meta/{id} - id is an optional parameter
        router.route('/form/meta/:id?').post(saveFormMeta);

        // GET /api/form/meta/{id}
        router.route('/form/meta/:id').get(getFormMeta);

        // GET /api/forms/{includeMeta}
        router.route('/forms/:includeMeta').get(getForms);

        // DELETE /api/form/meta/{id}/{softDelete}
        router.route('/form/meta/:id/:isSoftDelete').delete(deleteForm);
    }

    // GET /api/form/ping
    async function ping(req, res,next) {
        console.log(require('../../services/cryptoService').getHash('P@ssw0rd'));
        res.status(200).send({ done: 'Hello from server' });
    }

    /**
     * Action method for saving form meta
     * @param req - Request object
     * @param res - Response object
     */
    // POST /api/form/meta/:id?
    //@Route('GET','api/form/meta') - Using decorator to make route declarative
    async function saveFormMeta(req, res) {
        // Read the form json sent in the body of the POST request
        let form = req.body;
        // Read the optional id route parameter.
        let formId = req.params.id;
        let saveFormRequest = new FormRequest.SaveFormRequest(formId, form.name, false, req.user, form);
        console.log(req.user);

        let response = await formService.saveFormMeta(saveFormRequest);
        controllerHelper.handleResponse(res, response, controllerHelper.getCreateResponse);
    }

    /**
     * Action method to get form meta based on the form id
     * @param req - Request object
     * @param res - Response object
     */
    // GET /api/form/meta/{id}
    async function getFormMeta(req, res) {
        let formId = req.params.id;

        let formRequest = new FormRequest.FormRequest(formId, '');
        let response = await formService.getFormMeta(formRequest);

        controllerHelper.handleResponse(res, response, controllerHelper.getSuccessResponse);
    } 

    /**
     * Action method to fetch configured forms for a user. Provides option to include meta or only the forms list
     * @param req - Request object
     * @param res - Response object
     */
    // GET /api/forms/{includeMeta}
    async function getForms(req, res) {
        console.log(`Get Forms by : ${process.pid} received`);
        let includeMeta = req.params.includeMeta == '1' ? true : false;
        let formRequest = new FormRequest.FormRequest('', '', includeMeta,req.user);

        let response = await formService.getForms(formRequest);

        controllerHelper.handleResponse(res, response, controllerHelper.getSuccessResponse, controllerHelper.getErrorResponse);

        //require('../../services/diagnosticService').getMemorySnapshot();
    }

    // DELETE /api/form/meta/{id}/{isSoftDelete}
    /**
     * Action method for delete form
     * @param req - Request 
     * @param res - Response
     */
    async function deleteForm(req, res) {
        let formId = req.params.id;
        let isSoftDelete = (req.params.isSoftDelete == 'true');
        let deleteFormRequest = new FormRequest.DeleteFormRequest(formId, '', false, req.user, isSoftDelete);

        let response = await formService.deleteForm(deleteFormRequest);

        controllerHelper.handleResponse(res, response, controllerHelper.getSuccessResponse);
    }

    


    return {
        init : _init,
        saveFormMeta: saveFormMeta,
        getFormMeta: getFormMeta
    };
})();