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
        let connectStatus = await this.connect();
        if (connectStatus) {
            return connectStatus;
        }

        return await this.doInsert(user, config.mongodb.usersCollection);
    }

    return {
        UserDataAccess: UserDataAccess
    };
})();