// DAL for Users collection

module.exports = (function () {
    let DABase = require('./DataAccessBase.js');
    // require config module
    const config = require('../infrastructure/config.js');

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
     * Determines if the username exists
     */
    UserDataAccess.prototype.isUserExist = async function(authInfo){
        let response = await this.findOne({}, _getUsernameFilter(authInfo), _getCollection());
        return response;
    }

    function _getCollection(){
        return config.mongodb.usersCollection;
    }

    function _getLoginProjection() {
        return { userName: 1, password: 1};
    }

    function _getUsernameFilter(authInfo) {
        return {
            $and: [
                { userName: { $exists: true }},
                { userName: authInfo.userName}
            ]
        };
    }

    return {
        UserDataAccess: UserDataAccess
    };
})();