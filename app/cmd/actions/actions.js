const { cmdArguments } = require('../cli/arguments');
const { usage } = require('../cli/usage');
const { help, translateDatabase, translateJson} = require('../../uucloud-db-translator');

const COMMANDS = {
  COMMAND_HELP: 'help',
  COMMAND_TRANSLATE_DB: 'translateDatabase',
  COMMAND_TRANSLATE_JSON: 'translateJson'
};

const actions = {
  showHelp: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_HELP || cmdArguments.help || Object.keys(cmdArguments).length === 0),
    action: async () => await help(usage)
  },
  translateDb: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_TRANSLATE_DB),
    action: async () => await translateDatabase(cmdArguments)
  },
  translateJson: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_TRANSLATE_JSON),
    action: async () => await translateJson(cmdArguments)
  }
};

const handleCondition = (condition) => {
  if (_isKnownAction()) {
    return condition;
  }
};

const _isKnownAction = () => !cmdArguments._unknown;

module.exports = {
  actions,
  COMMANDS
};
