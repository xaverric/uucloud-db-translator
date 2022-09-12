const commandLineUsage = require('command-line-usage');
const { cmdArgumentsDefinition } = require('./arguments.js');

const usageDefinition = [
  {
    header: 'uucloud-db-translator',
    content: '...'
  },
  {
    header: 'Synopsis',
    content: '$uucloud-db-translator <command> <command parameters>'
  },
  {
    header: 'Commands',
    content: [
      { name: 'help', summary: 'Display this help.' },
      { name: 'translateDatabase', summary: 'Performs DB translation.' },
      { name: 'translateJson', summary: 'Performs DB export translation.' }
    ]
  },
  {
    header: 'Parameters',
    optionList: cmdArgumentsDefinition
  }
];

const usage = commandLineUsage(usageDefinition);

module.exports = {
  usage
};
