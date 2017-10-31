// DAL for Users collection

module.exports = (function () {
    var DABase = require('./DataAccessBase.js');
    // require config module
    var config = require('../infrastructure/config.js');
    var TypeEnum = require('../models/TypeEnum').TypeEnum; 

    // constructor for User DAL
    function UserDataAccess() {
        // always invoke base contructor
        DABase.DataAccessBase.call(this);

    }

    UserDataAccess.prototype = Object.create(DABase.DataAccessBase.prototype);
    UserDataAccess.prototype.constructor = UserDataAccess;


    UserDataAccess.prototype.addUser = async function (user) {
        return await this.doInsert(user,_getCollection() );
    }

    /**
     * Determines if the user exists
     */
    UserDataAccess.prototype.isUserExist = async function(request){
        let response = await this.findOne({}, _getUserFilter(request), _getCollection());
        return response;
    }

    function _getCollection(){
        return config.mongodb.usersCollection;
    }

    function _getLoginProjection() {
        return { userName: 1, password: 1};
    }

    /**
     * Returns the filter to be used for searching for a user
     * @param {*UserExistsRequest} request 
     */
    function _getUserFilter(request) {
        switch(request.type){
            case TypeEnum.Username:
                return {
                    $and: [
                        { userName: { $exists: true }},
                        { userName: request.value}
                    ]
                };
            case TypeEnum.Email:
                return {
                    $and: [
                        { email: { $exists: true }},
                        { email: request.value}
                    ]
                };
        }
        
    }

    return {
        UserDataAccess: UserDataAccess
    };
})();