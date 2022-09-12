const { readConfiguration } = require("./modules/configuration/configuration-reader-module");
const { CONSOLE_LOG } = require("./modules/logger/logger");
const { connect, disconnect } = require("./modules/mongodb/mongo-connection-helper");
const { translateDbs } = require("./modules/translator/db/db-translator-module");
const { translateJsonFiles } = require("./modules/translator/json/json-translator-module");

const translateDatabase = async cmdArgs => {
    let configuration = readConfiguration(cmdArgs);
    let client = await connect(configuration.mongodb);
    await translateDbs(configuration, cmdArgs, client);
    await disconnect(client, configuration.mongodb);
}

const translateJson = async cmdArgs => {
    let configuration = readConfiguration(cmdArgs);
    await translateJsonFiles(configuration, cmdArgs);
}

const help = async (usage) => {
    CONSOLE_LOG.debug(usage)
}

module.exports = {
    translateDatabase,
    translateJson,
    help
}