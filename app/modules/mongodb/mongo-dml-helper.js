const { ObjectId } = require("bson");

const DEFAULT_DBS = ["admin", "config", "local"];

/**
 * Returns non-binary DB names in array list
 * 
 * @param {*} client 
 * @returns 
 */
const getApplicationDbNames = async (client) => {
    let listDbResult = await client.db().admin().listDatabases();
    return listDbResult.databases
        .map(db => db.name)
        .filter(dbName => !dbName.includes("Binary"))
        .filter(dbName => !DEFAULT_DBS.includes(dbName));
}

const getDbCollectionNames = async (dbName, client) => {
    let listCollectionResult = await client.db(dbName).listCollections().toArray();
    return listCollectionResult.map(collection => collection.name);
}

const getAllDocumentsCursor = async (dbName, collectionName, client) => {
    return await client.db(dbName).collection(collectionName).find({});
}

const getDocumentsCount = async (dbName, collectionName, client) => {
    return await client.db(dbName).collection(collectionName).estimatedDocumentCount();
}

const replaceDocument = async (dbName, collectionName, id, document, client) => {
    return await client.db(dbName).collection(collectionName).replaceOne({ "_id": ObjectId(id)}, document);
}

module.exports = {
    getApplicationDbNames,
    getDbCollectionNames,
    getAllDocumentsCursor,
    getDocumentsCount,
    replaceDocument
}