// DA for Forms collection

module.exports = (function () {
    let DABase = require('./DataAccessBase.js');
    // require config module
    const config = require('../infrastructure/config.js');

    // constructor for User DAL
    function FormDataAccess() {
        // always invoke base contructor
        DABase.DataAccessBase.call(this);
    }

    FormDataAccess.prototype = Object.create(DABase.DataAccessBase.prototype);
    FormDataAccess.prototype.constructor = FormDataAccess;

    FormDataAccess.prototype.getFormsByUser = async function (formRequest) {
        let response = await this.doGet(_getProjection(formRequest), _getUserFilter(formRequest.user), config.mongodb.formsCollection);
        return response;
    }

    FormDataAccess.prototype.getFormMeta = async function (formRequest) {
        let response = await this.doGet(_getProjection(formRequest), _getIdFilter(formRequest), config.mongodb.formsCollection);
        return response;
    }

    
    /**
     * Creates/Update form meta
     * @param saveFormRequest - SaveFormRequest object containing form meta and other information
     */
    FormDataAccess.prototype.saveFormMeta = async function (saveFormRequest) {
        let response = await this.doUpsert({ id: saveFormRequest.id }, saveFormRequest.formMeta, config.mongodb.formsCollection);
        return response;

    }

    /**
     * Deletes form document  from the forms collection
     * @param deleteFormRequest - Delete Form Request
     */
    FormDataAccess.prototype.deleteForm = async function (deleteFormRequest) {
        let response = await this.doDelete(_getDeleteFormFilter(deleteFormRequest), config.mongodb.formsCollection);
        return response;
    }

    /**
     * Updates form with the passed in payload
     * @param updateFormRequest
     */
    FormDataAccess.prototype.updateForm = async function (updateFormRequest) {
        let response = await this.doUpdate(_getSoftDeleteSelectionCriteria(updateFormRequest), { $set: updateFormRequest.formMeta }, config.mongodb.formsCollection);
        return response;
    }

    function _getProjection(formRequest) {
        return formRequest.includeMeta ? {} : { name: 1, id: 1,markForDeletion:1 };
    }

    function _getUserFilter(user) {
        return {
            $and: [
                { name: { $exists: true }},
                { userId: user.id}
            ]
        };
    }

    function _getIdFilter(formRequest) {
        return {
            id: formRequest.id
        };
    }

    /**
     * Gets the filter object to be applied for a delete document operation
     * @param deleteFormRequest - Delete Form Request containing form id
     */
    function _getDeleteFormFilter(deleteFormRequest) {
        return _getIdFilter(deleteFormRequest);
    }

    /**
     * Gets the selection criteria for a soft delete operation
     * @param updateFormRequest
     */
    function _getSoftDeleteSelectionCriteria(updateFormRequest) {
        return _getIdFilter(updateFormRequest);
    }

    return {
        FormDataAccess: FormDataAccess
    };
})();