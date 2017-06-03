// Base class for DAL-classes

module.exports = (function () {
    // require the mongodb package
    var mongodb = require('mongodb');
    // require config module
    var config = require('../infrastructure/config.js');
    var ResponseBase = require('../models/ResponseBase.js');


    // Constructor function
    function DataAccessBase() {
    }

    // Holds the Database connection
    DataAccessBase.prototype.Database = {};

    // Establishes connection to MongoDb and creates the underlying database object with collections
    DataAccessBase.prototype.connectCore = async function () {
        let mongoDb = await mongodb.MongoClient.connect(config.mongodb.url);
        if (mongoDb == null) {
            return false;
        }
        this.Database = {
            db: mongoDb,
            forms: mongoDb.collection(config.mongodb.formsCollection),
            users: mongoDb.collection(config.mongodb.usersCollection)
        };
        return true;
    }

    DataAccessBase.prototype.connect = async function () {
        let status = await this.connectCore();
        if (!status) {
            return _getDbErrorResponseObject();
        }
        return null;
    }

    DataAccessBase.prototype.doInsert = async function (data, collection) {
        let response = await this.Database[collection].insert(data);

        let success = false;
        if (response == null || !response.result.ok) {
        } else {
            success = true;
        }
        return _getResponseObject(success, data);
    }

    DataAccessBase.prototype.doGet = async function (projection, filter, collection) {
        let response = null;
        try {
            // since find returns a cursor, need to convert to array
            response = await this.Database[collection].find(filter, projection).toArray();
            let success = false;
            if (response == null) {
            } else {
                success = true;
            }
            return _getResponseObject(success, '', response);
        }
        catch (e) {
            console.log(e);
        }
    }

    // Helper Functions
    function _getDbErrorResponseObject() {
        let errorResponseBase = new ResponseBase();
        errorResponseBase.isSuccess = false;
        errorResponseBase.message = 'Failed to conncect to persistent storage';

        return errorResponseBase;
    }
    function _getResponseObject(isSuccess, data) {
        let responseBase = new ResponseBase.ResponseBase();
        responseBase.isSuccess = isSuccess;
        responseBase.data = data;

        return responseBase;
    }
    function _getResponseObject(isSuccess, message, data) {
        let responseBase = new ResponseBase.ResponseBase();
        responseBase.isSuccess = isSuccess;
        responseBase.message = message;
        responseBase.data = data;

        return responseBase;
    }

    return {
        DataAccessBase: DataAccessBase
    };
})();