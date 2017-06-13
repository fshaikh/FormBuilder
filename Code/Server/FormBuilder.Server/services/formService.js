// Form Service. Provides fomr-related functionality

module.exports = (function () {
    const utilService = require('./utilService.js');
    const formDA = require('../DAL/formDA.js');
    var ResponseBase = require('../models/ResponseBase.js');
    
    async function saveFormMeta(saveFormRequest) {
        let formId = utilService.getUniqueId();
        let formMeta = saveFormRequest.formMeta;

        formMeta.id = formId;
        formMeta.userId = saveFormRequest.user.userId;

        // Save to database
        let response = await _createFormDA().saveFormMeta(saveFormRequest);
        return response;
    }

    async function getFormMeta(formRequest) {
        return await dal.getFormMeta(formRequest);
    }

    async function getForms(formRequest) {
        return await _createFormDA().getFormsByUser(formRequest);
    }

    function _createFormDA() {
        return new formDA.FormDataAccess();
    }

    return {
        saveFormMeta: saveFormMeta,
        getFormMeta: getFormMeta,
        getForms: getForms
    };
})();