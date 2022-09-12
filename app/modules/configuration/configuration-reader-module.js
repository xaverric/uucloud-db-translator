const fs = require("fs");
const path = require("path");

/**
 * Read JSON file from given file path location and parse its content to the object
 *  
 * @param {string} filePath 
 * @returns 
 */
const readJsonFile = filePath => {
    let data;
    try {
        data = JSON.parse(fs.readFileSync(filePath));
    } catch (err) {
        throw new Error(`Error occurred during loading file ${filePath}. Err: ${err}`);
    }
    return data;
};

const readConfiguration = cmdArgs => {
    let filePath = path.resolve(cmdArgs.config);
    return readJsonFile(filePath);
};

module.exports = {
    readConfiguration
}