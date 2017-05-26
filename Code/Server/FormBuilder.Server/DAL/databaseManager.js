// Povides all database related functions
module.exports = (function () {
    // require the mongodb package
    var mongodb = require('mongodb');
    // require config module
    var config = require('../infrastructure/config.js');
    var ResponseBase = require('../models/ResponseBase.js');

    // represents a database object
    var _database;

    async function connect() {
        let mongoDb = await mongodb.MongoClient.connect(config.mongodb.url);
        if (mongoDb == null) {
            return false;
        }
        _database = {
            db: mongoDb,
            forms: mongoDb.collection(config.mongodb.formsCollection)
        };
        return true;
    }

    async function saveFormMeta(form) {
        let status = await connect();
        if (!status) {
            return _getDbErrorResponseObject();
        }
        let response = await _database.forms.insert(form);
        let success = false;
        let message = 'Successfully saved form meta';
        if (response == null || !response.result.ok) {
            message = 'Failed to insert form meta';
        } else {
            success = true;
        }
        return _getResponseObject(success, message, form);
        
    }

    async function getFormMeta(formRequest) {
        let status = await connect();
        if (!status) {
            return _getDbErrorResponseObject();
        }

        let response = null;
        try {
           response  = await _database.forms.findOne({ id: formRequest.id });
        }
        catch (e){
            console.log(e);
        }
        let success = false;
        let message = '';
        if (response == null) {
            message = 'Failed to get form meta';
        } else {
            success = true;
        }
        return _getResponseObject(success,message,response);
    }

    // Returns all defined forms in the system
    async function getForms(formRequest) {
        let status = await connect();
        if (!status) {
            return _getDbErrorResponseObject();
        }
        let response = null;
        try {
            // since find returns a cusror, need to convert to array
            response = await _database.forms.find({ name: {$exists:true}}, _getProjection(formRequest)).toArray();
        }
        catch (e) {
            console.log(e);
        }

        let success = false;
        let message = '';
        if (response == null) {
            message = 'Failed to get form meta';
        } else {
            success = true;
        }
        return _getResponseObject(success, message, response);
    }

    function _getResponseObject(isSuccess,message,data) {
        let responseBase = new ResponseBase.ResponseBase();
        responseBase.isSuccess = isSuccess;
        responseBase.message = message;
        responseBase.data = data;

        return responseBase;
    }

    function _getDbErrorResponseObject() {
        let errorResponseBase = new ResponseBase();
        errorResponseBase.isSuccess = false;
        errorResponseBase.message = 'Failed to conncect to persistent storage';

        return errorResponseBase;
    }

    function _getProjection(formRequest) {
        return formRequest.includeMeta ? {} : { name: 1,id:1 };
    }


    return {
        saveFormMeta: saveFormMeta,
        getFormMeta: getFormMeta,
        getForms: getForms
    };
})();