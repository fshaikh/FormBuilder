// Authentication Service. Provides functionality for login/logoff/register, etc

module.exports = (function(){
    var authenticationInfo = require('../models/AuthenticationInfo').AuthenticationInfo;
    var UserDataAccess = require('../DAL/userDA').UserDataAccess;
    var ResponseBase = require('../models/ResponseBase').ResponseBase;
    var tokenProviderFactory = require('./tokenProviderFactory');
    var utilService = require('./utilService');
    var User = require('../models/User').User;
    var cryptoService = require('./cryptoService');
    var UserExistsRequest = require('../models/UserExistsRequest').UserExistsRequest;
    var TypeEnum = require('../models/TypeEnum').TypeEnum;
    var UserExistsResponse = require('../models/UserExistsResponse').UserExistsResponse;
    
    /**
     * Validates the login for the passed user
     * @param authInfo - Object containing authentication info
     */
    async function doLogin(authInfo){
        var responseBase = new ResponseBase();

        // call DA to check if the user exists
        var request = new UserExistsRequest(TypeEnum.Username,authInfo.userName);
        var savedAuthInfo = await _createUserDA().isUserExist(request);
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
        var newUser = await _getNewUser(user);

        // 4. Call DA to save the user
        response = await _createUserDA().addUser(newUser);
        
        // 5. Process the output before sending
        _processOutput(response.data);
        
        // 5. Return success/error response
        return response;
    }

    /**
     * Determines if a user exists based on the typed value.
     * @param req - Request object
     */
    async function isUserExists(request){
        var response = new ResponseBase();
        var request = new UserExistsRequest(TypeEnum.Username,request.value);
        try{
            var savedAuthInfo = await _createUserDA().isUserExist(request);
            // If user does not exist, return error response : UserNotFound
            response.data = {exists:savedAuthInfo.data == null ? false : true};
            response.isSuccess = true;
        }catch(e){
            console.error(`authService::isUserExists. Exception: ${e}`);
            response.isSuccess = false;
            response.message = 'Error in server';
        }
        
        return response;
    }

    /**
     * Creates User DA object
     */
    function _createUserDA() {
        return new UserDataAccess();
    }

    async function _getNewUser(user){
        var newUser = new User();
        newUser.id = utilService.getUniqueId();
        newUser.userName = user.userName;
        await _setPassword(newUser,user);
        newUser.isGuestAuth = false;

        return newUser;
    }

    /**
     * Validates if the passwords are same
     * @param savedAuthInfo
     * @param authInfo
     */
    function _validatePassword(savedAuthInfo, authInfo){
        var salt = utilService.fromBase64String(savedAuthInfo.salt);
        var savedHashedPassword = utilService.toBase64String(_getSaltedPassword(salt, authInfo.password));
        return savedHashedPassword === savedAuthInfo.hashedPassword ? true : false;
    }

    function _getTokenPayload(payload){
        var tokenPayload = Object.assign(payload);
        _processOutput(tokenPayload);
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

    /**
     * 
     * @param {*User} newUser -  New user
     * @param {*User} user - Passed in user object
     */
    async function _setPassword(newUser, user){
        var salt = await _getSalt();
        newUser.salt = utilService.toBase64String(salt);
        newUser.hashedPassword = utilService.toBase64String(_getSaltedPassword(salt,user.password));
    }

    /**
     * Gets the hashed password given the salt and password
     */
    function _getSaltedPassword(salt,passwordStr){
        // 1. Get Buffer for the password string
        var password = utilService.toBytes(passwordStr);
        // 2. Combine the password + salt
        var saltedPassword = utilService.combineBuffer(password,salt);
        // 3. Get the hash of the password + salt
        var saltedPasswordHash = cryptoService.getHash(saltedPassword);
        return saltedPasswordHash;
    }

    /**
     * Gets the user salt
     */
    async function _getSalt(){
        // 1. Get the salt. This must be unique for each user
        return await cryptoService.generateCSRN(256);
    }
    
    function _processOutput(response) {
        // Remove the password fields
        delete response.password;
        delete response.salt;
        delete response.hashedPassword;
    }
    
    
    

    return{
        doLogin: doLogin,
        registerUser: registerUser,
        isUserExists : isUserExists
    };
})();