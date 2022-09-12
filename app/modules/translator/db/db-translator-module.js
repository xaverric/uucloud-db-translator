const { getApplicationDbNames, getDbCollectionNames, getAllDocumentsCursor, replaceDocument, getDocumentsCount } = require('../../mongodb/mongo-dml-helper');
const { convertToString, convertToObject } = require("../../mongodb/mongo-data-manipulation-helper");
const { performReplacements } = require('../replace-data-module');
const { CONSOLE_LOG } = require('../../logger/logger');

const CHUNK_SIZE = 5000;

const getFilteredDbNames = (dbNames, cmdArgs) => {
    let includedDbs = cmdArgs.databases ? dbNames.filter(name => cmdArgs.databases.includes(name)) : dbNames;
    let filteredDbs = cmdArgs.skipDatabases ? includedDbs.filter(name => !cmdArgs.skipDatabases.includes(name)) : includedDbs;
    return filteredDbs;
}

const getFilteredCollectionNames = (collectionNames, cmdArgs) => {
    let includedCollections = cmdArgs.collections ? collectionNames.filter(name => cmdArgs.collections.includes(name)) : collectionNames;
    let filteredCollections = cmdArgs.skipCollections ? includedCollections.filter(name => !cmdArgs.skipCollections.includes(name)) : includedCollections;
    return filteredCollections;
}

const iterateCollections = async (dbName, configuration, cmdArgs, client) => {
    let collections = await getDbCollectionNames(dbName, client);
    let filteredCollections = getFilteredCollectionNames(collections, cmdArgs);
    CONSOLE_LOG.info(`Loaded collections: ${filteredCollections.join(", ")}`);
    for (let collectionName of filteredCollections) {
        await iterateDocuments(dbName, collectionName, configuration, client);
    }
}

const performReplacementsAndFilterChangedOnly = (accumulator, document, configuration) => {
    let modifiedDocument = performReplacements(document, configuration.translation);
    if (document !== modifiedDocument) {
        accumulator.push(modifiedDocument);
    }
    return accumulator;
}

const iterateDocuments = async (dbName, collectionName, configuration, client) => {
    let cursor = await getAllDocumentsCursor(dbName, collectionName, client);
    let count = await getDocumentsCount(dbName, collectionName, client);

    let chunkSize = configuration.mongodb?.options?.chunkSize || CHUNK_SIZE;
    let documents = [];
    let processedCount = 0;
    while (await cursor.hasNext()) {
        documents.push(await cursor.next());
        if (documents.length === chunkSize || !await cursor.hasNext()) {
            let result = await Promise.allSettled(documents
                .map(convertToString)
                .reduce((accumulator, document) => performReplacementsAndFilterChangedOnly(accumulator, document, configuration), [])
                .map(convertToObject)
                .map(document => replaceDocument(dbName, collectionName, document._id, document, client))
            );
            processedCount += documents.length;
            let modified = result.filter(item => item.modifiedCount > 0).length;
            CONSOLE_LOG.info(`${dbName}.${collectionName} - ${processedCount} documents of ${count} processed. Chunksize: ${chunkSize}, Executed: ${documents.length}, Modified: ${modified}`);
            documents = [];
        }
    }
}

const translateDbs = async (configuration, cmdArgs, client) => {
    let dbNames = await getApplicationDbNames(client);
    let filteredDbNames = getFilteredDbNames(dbNames, cmdArgs);
    CONSOLE_LOG.info(`Loaded databases: ${filteredDbNames.join(", ")}`);
    for (let dbName of filteredDbNames) {
        CONSOLE_LOG.info(`Working on database: ${dbName}`);
        await iterateCollections(dbName, configuration, cmdArgs, client);
    }
}

module.exports = {
    translateDbs
}
