// Form Service. Provides fomr-related functionality

module.exports = (function () {
    const utilService = require('./utilService.js');
    const dal = require('../DAL/databaseManager.js');
    var ResponseBase = require('../models/ResponseBase.js');
    
    async function saveFormMeta(form) {
        let formId = utilService.getUniqueId();

        form.id = formId;

        // Save to database
        let response = await dal.saveFormMeta(form);
        return response;
    }

    async function getFormMeta(formRequest) {
        return await dal.getFormMeta(formRequest);
    }

    async function getForms(formRequest) {
        return await dal.getForms(formRequest);
    }

    return {
        saveFormMeta: saveFormMeta,
        getFormMeta: getFormMeta,
        getForms: getForms
    };
})();