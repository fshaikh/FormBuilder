// Service class for User and auth related functionality

module.exports = (function () {
    const utilService = require('../services/utilService.js');
    const userDAL = require('../DAL/userDA.js');

    async function getUser(userId) {
        let user = { userId:  userId, isGuest: true };
        if (userId) {
            return user;
        }
        // b. If userid is blank, implies new user.So generate a random unique userid
        if (!userId) {
            user.userId = utilService.getUniqueId();
            user.userName = 'guest_' + user.userId;
            // c. Save the new user in users collection in MongoDb
            let userDA = new userDAL.UserDataAccess();
            let response = await userDA.addUser(user);
            return user;
        }  
    }

    return {
        getUser:getUser
    };

})();