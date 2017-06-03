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
        let connectStatus = await this.connect();
        if (connectStatus) {
            return connectStatus;
        }

        let response = await this.doGet(_getProjection(formRequest), _getUserFilter(formRequest.user), config.mongodb.formsCollection);
        return response;
    }

    function _getProjection(formRequest) {
        return formRequest.includeMeta ? {} : { name: 1, id: 1 };
    }

    function _getUserFilter(user) {
        return {
            $and: [
                { name: { $exists: true }},
                { userId: user.userId}
            ]
        };
    }

    return {
        FormDataAccess: FormDataAccess
    };
})();