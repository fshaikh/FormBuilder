// Form Service. Provides fomr-related functionality

module.exports = (function () {
    const utilService = require('./utilService.js');
    const formDA = require('../DAL/formDA.js');
    var ResponseBase = require('../models/ResponseBase.js');
    const FormRequest = require('../models/FormRequest.js');

    /**
     * Saves form meta. Both insert/update are handled by this function.
     * @param saveFormRequest - SaveFormRequest object containing form meta and other information
     */
    async function saveFormMeta(saveFormRequest) {
        // Set the form id. If there is no form id, its a CREATE request else an UPDATE
        saveFormRequest.id = saveFormRequest.id ? saveFormRequest.id : utilService.getUniqueId();
        let formMeta = saveFormRequest.formMeta;

        formMeta.id = saveFormRequest.id;
        formMeta.userId = saveFormRequest.user.id;

        // Save to database
        let response = await _createFormDA().saveFormMeta(saveFormRequest);
        return response;
    }

    async function getFormMeta(formRequest) {
        formRequest.includeMeta = true;
        return await _createFormDA().getFormMeta(formRequest);
    }

    /**
     * Get forms for a user
     * @param formRequest - Form Request
     */
    async function getForms(formRequest) {
        let response;
        response = await _createFormDA().getFormsByUser(formRequest);
        return response;
    }

    /**
     * Deletes form meta. If request is for a soft delete, the form is not deleted from the database. A flag is marked on the form document.
       In case of hard delete, form is deleted from forms collection and all its submissions as well.
     */
    async function deleteForm(deleteFormRequest) {
        // If its a hard delete, delete the form and its submissions
        if (!deleteFormRequest.isSoftDelete) {
            return await _handleHardDelete(deleteFormRequest);
        }
        // handle soft delete
        return await _handleSoftDelete(deleteFormRequest);
    }

    /**
     * Permanently deletes the form and its submissions
     * @param deleteFormRequest - Delete Form Request containing form id 
     */
    async function _handleHardDelete(deleteFormRequest) {
        // TODO:Delete Submissions
        // Delete form
        return await _createFormDA().deleteForm(deleteFormRequest);
    }

    /**
     * Marks a form as delete. Updates the form document adding isDelete:true property
     * @param deleteFormRequest - Delete Form Request containing form id 
     */
    async function _handleSoftDelete(deleteFormRequest) {
        // TODO:Delete Submissions
        // Delete form
        let updateData = {markForDeletion:true};
        let saveFormRequest = new FormRequest.SaveFormRequest(deleteFormRequest.id, deleteFormRequest.name, deleteFormRequest.includeMeta, deleteFormRequest.user, updateData);
        return await _createFormDA().updateForm(saveFormRequest);
    }

    

    function _createFormDA() {
        return new formDA.FormDataAccess();
    }

    return {
        saveFormMeta: saveFormMeta,
        getFormMeta: getFormMeta,
        getForms: getForms,
        deleteForm: deleteForm
    };
})();