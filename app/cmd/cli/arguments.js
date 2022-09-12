const commandLineArgs = require('command-line-args');

const cmdArgumentsDefinition = [
  {
    name: 'command',
    defaultOption: true,
    type: String,
    description: 'translateDatabase, translateJson, help commands. All these can be used as default commands without providing --command argument.'
  },
  {
    name: 'config',
    alias: 'c',
    type: String,
    description: 'File path to the configuration object'
  },
  {
    name: 'database',
    multiple: true,
    type: String,
    description: 'Databases to be translated.'
  },
  {
    name: 'collection',
    multiple: true,
    type: String,
    description: 'Collections to be translated'
  },
  {
    name: 'excludeDatabase',
    multiple: true,
    type: String,
    description: 'Databases to be removed from the translation.'
  },
  {
    name: 'excludeCollection',
    multiple: true,
    type: String,
    description: 'Collections to be removed from the translation.'
  },
  {
    name: 'filePath',
    type: String,
    description: 'Applicable for \'translateJson\' command. File path to the JSON DB export which will be translated.'
  },
];

const cmdArguments = commandLineArgs(cmdArgumentsDefinition, { stopAtFirstUnknown: true });

module.exports = {
  cmdArgumentsDefinition,
  cmdArguments
};
