const fs = require("fs");
const es = require("event-stream");
const path = require("path");
const { performReplacements } = require("../replace-data-module");
const { CONSOLE_LOG, CONSOLE_TIME_LOG } = require("../../logger/logger");

const getUpdatedNamePath = (filePath) => {
    let fileName = path.parse(filePath).name;
    let fileExt = path.parse(filePath).ext;
    let fileDirectory = path.dirname(filePath);

    return path.resolve(fileDirectory, `${fileName}_translated${fileExt}`);
}

const translateJsonFiles = async (configuration, cmdArgs) => {
    let translatedFile = getUpdatedNamePath(cmdArgs.filePath);
    CONSOLE_TIME_LOG.info(`Translating file '${cmdArgs.filePath}' into '${translatedFile}'`);

    let lineCount = 0;
    let readStream = fs.createReadStream(path.resolve(cmdArgs.filePath))
        .pipe(es.split())
        .pipe(es.mapSync(line => {
            lineCount++;
            if(lineCount % 10000 === 0) {
                CONSOLE_TIME_LOG.info(`${lineCount} lines processed...`);
            }
            return performReplacements(line, configuration.translation) + "\n"
        }))
        .pipe(fs.createWriteStream(translatedFile));

    readStream.on('finish', () => {
        CONSOLE_LOG.info(`Translation done. ${lineCount} lines processed.`);
    });

    readStream.on('error', err => {
        CONSOLE_LOG.error(`Unexpected error ocurred during the translation of the file. Error on line: ${lineCount}. Error: ${err}`);
    });
}

module.exports = {
    translateJsonFiles
}