const { MongoClient } = require('mongodb');
const { CONSOLE_LOG } = require("../logger/logger");

/**
 * 
 * @param {*} mongodbConfig 
 * @returns 
 */
const connect = async mongodbConfig => {
    const url = `mongodb://${mongodbConfig.username}:${mongodbConfig.password}@${mongodbConfig.host}:${mongodbConfig.port}`;
    const client = new MongoClient(url);
    await client.connect();
    CONSOLE_LOG.info(`Connected to the MongoDB (${mongodbConfig.host}:${mongodbConfig.port})`);
    return client;
}

const disconnect = async (client, mongodbConfig) => {
    client.close();
    CONSOLE_LOG.info(`Disconnected from the MongoDB (${mongodbConfig.host}:${mongodbConfig.port})`);
}

module.exports = {
    connect,
    disconnect
}