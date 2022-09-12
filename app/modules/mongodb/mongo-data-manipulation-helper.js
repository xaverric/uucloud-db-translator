const { EJSON } = require("bson");

/**
 * Converts the given JS/BSON document to the string value with preserving the key types.
 * 
 * @param {*} document 
 * @returns string
 */
const convertToString = (document) => {
    return EJSON.stringify(document, {relaxed: false});
}

/**
 * Converts the given string value to the JS/BSON document with preserving the key types.
 * 
 * @param {*} document 
 * @returns string
 */
const convertToObject = (document) => {
    return EJSON.parse(document, {relaxed: false});
}

module.exports = {
    convertToString,
    convertToObject
}