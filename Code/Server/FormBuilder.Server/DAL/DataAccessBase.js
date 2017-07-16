﻿// Base class for DAL-classes

module.exports = (function () {
    // require the mongodb package
    var mongodb = require('mongodb');
    // require config module
    var config = require('../infrastructure/config.js');
    var ResponseBase = require('../models/ResponseBase.js');
    // Holds the Database connection
    var _database = null;

    // Constructor function
    function DataAccessBase() {
        // Do nothing
    }

    async function connectDb() {
        let mongoDb;
        try {
            mongoDb = await mongodb.MongoClient.connect(config.mongodb.url);
        }
        catch (e) {
            console.log(`Error in MongoDb Connection: ${e}`);
        }
        if (mongoDb == null) {
            return false;
        }
        _database = {
            db: mongoDb,
            forms: mongoDb.collection(config.mongodb.formsCollection),
            users: mongoDb.collection(config.mongodb.usersCollection)
        };
        return true;
    }

    /**
     * Inserts a document in the specified collection.
     * @param data - Document to insert
     * @param collection - Collection name to apply insert operation on
     */
    DataAccessBase.prototype.doInsert = async function (data, collection) {
        let response = await _database[collection].insert(data);

        let success = false;
        if (response == null || !response.result.ok) {
        } else {
            success = true;
        }
        return _getResponseObject(success,"", data);
    }

    /**
     * Updates a document in the specified collection if any document matches the passed in filter criteria. If no document matches the filter
     * criteria, inserts the document.
     * @param query - The selection criteria for the update
     * @param data - Modifications to apply
     * @param collection - Collection name to apply upsert operation on
     */
    DataAccessBase.prototype.doUpsert = async function upsert(query, data, collection) {
        let response = await _database[collection].update(query,
                                                              data,
                                                              {
                                                                  upsert: true, // creates a new document when no document matches the query criteria.
                                                                  multi: false  // updates one document only
                                                              });

        let success = false;
        if (response == null || !response.result.ok) {
        } else {
            success = true;
        }
        return _getResponseObject(success,"", data);
    }

     /**
     * Fetches document(s) based on the passed in projection and filter from a collection
     * @param projection - Document properties to return
     * @param filter - Filter criteria to apply on the collection
     * @param collection - Collection name to apply get operation on
     */
    DataAccessBase.prototype.doGet = async function (projection, filter, collection) {
        let response = null;
        try {
            // since find returns a cursor, need to convert to array
            response = await _database[collection].find(filter, projection).toArray();
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

    /**
     * Removes documents from a collection
     * @param filter - Filter to apply
     * @param collection - Collection to remove documents from
     */
    DataAccessBase.prototype.doDelete = async function (filter, collection) {
        let response = null;
        try {
            // since find returns a cursor, need to convert to array
            response = await _database[collection].remove(filter);
            let success = false;
            if (response == null || !response.result.ok) {
            } else {
                success = true;
            }
            return _getResponseObject(success,"", {});
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Update specific fields of an existing document only.Default behavior is to update only a single document
     * @param selectionCriteria - Selection Criteria to find the single document
     * @param updateData - Modifications to apply
     */
    DataAccessBase.prototype.doUpdate = async function (selectionCriteria, updateData,collection) {
        let response = await _database[collection].update(selectionCriteria, updateData);

        let success = false;
        if (response == null || !response.result.ok) {
        } else {
            success = true;
        }
        return _getResponseObject(success,"", updateData);
    }

    // Helper Functions
    function _getDbErrorResponseObject() {
        let errorResponseBase = new ResponseBase();
        errorResponseBase.isSuccess = false;
        errorResponseBase.message = 'Failed to conncect to persistent storage';

        return errorResponseBase;
    }

    function _getResponseObject(isSuccess, message, data) {
        let responseBase = new ResponseBase.ResponseBase();
        responseBase.isSuccess = isSuccess;
        responseBase.message = message;
        responseBase.data = data;

        return responseBase;
    }

    return {
        DataAccessBase: DataAccessBase,
        ConnectDb: connectDb
    };
})();