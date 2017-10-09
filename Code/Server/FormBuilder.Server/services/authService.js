// Authentication Service. Provides functionality for login/logoff/register, etc

module.exports = (function(){
    var authenticationInfo = require('../models/AuthenticationInfo').AuthenticationInfo;
    var UserDataAccess = require('../DAL/userDA').UserDataAccess;
    var ResponseBase = require('../models/ResponseBase').ResponseBase;
    var tokenProviderFactory = require('./tokenProviderFactory');
    var utilService = require('./utilService');
    var User = require('../models/User').User;
    
    /**
     * Validates the login for the passed user
     * @param authInfo - Object containing authentication info
     */
    async function doLogin(authInfo){
        var responseBase = new ResponseBase();

        // call DA to check if the user exists
        var savedAuthInfo = await _createUserDA().isUserExist(authInfo);
        // If user does not exist, return error response : UserNotFound
        if(savedAuthInfo.data == null){
            responseBase.isSuccess = false;
            return responseBase;
        }
        // call DA to check if password is valid
        if(!_validatePassword(savedAuthInfo.data,authInfo)){
            // If invalid password, return error response
            responseBase.isSuccess = false;
            return responseBase;
        }
        
        // Get the JWT token
        var tokenPayload = _getTokenPayload(savedAuthInfo.data);
        var token = await _getToken(tokenPayload);
        
        savedAuthInfo.data = {
            user: tokenPayload,
            authToken: token
        };

        return savedAuthInfo;
    }

    

    /**
     * Creates a new user account.
     * @param user
     */
    async function registerUser(user) {
        var response = new ResponseBase();

        // 1. Check if the username already exists.If it exists, return
        // 2. Check if password meets minimum security requirements.

        // 3. Create a system id for the new user
        var newUser = new User();
        newUser.id = utilService.getUniqueId();
        newUser.userName = user.userName;
        newUser.password = user.password;
        newUser.isGuestAuth = false;

        // 4. Call DA to save the user
        response = await _createUserDA().addUser(newUser);
        // Remove the password
        delete response.data.password;
        
        // 5. Return success/error response
        return response;
    }

    /**
     * Creates User DA object
     */
    function _createUserDA() {
        return new UserDataAccess();
    }

    /**
     * Validates if the passwords are same
     * @param savedAuthInfo
     * @param authInfo
     */
    function _validatePassword(savedAuthInfo,authInfo){
        return savedAuthInfo.password === authInfo.password ? true : false;
    }

    function _getTokenPayload(payload){
        var tokenPayload = Object.assign(payload);
        delete tokenPayload.password;
        return tokenPayload;
    }

    /**
     * Calls Token Provider to get the auth token to be sent to client
     * @param payload - Payload to inlcude as claims in the token
     */
    async function _getToken(payload) {
        var tokenProvider = tokenProviderFactory.getTokenProvider();
        if (tokenProvider == null) {
            throw new Error('No registered Token Provider');
        }

        return await tokenProvider.getToken(payload);
    }

    return{
        doLogin: doLogin,
        registerUser: registerUser
    };
})();