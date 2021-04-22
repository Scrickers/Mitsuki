const { Command } = require('discord-akairo')
const { nsfw } = require('../../Util/Functions')

class pussyCommand extends Command {
  constructor() {
    super('pussy', {
      aliases: ['pussy'],
      args: [],
      description: {
        usage: 'pussy',
        examples: ['pussy'],
        description: ''
      },
      cooldown: 3000,
      ratelimit: 3
    })
  }

  exec(message) {
    nsfw(message, "pussy")
  }
}

module.exports = pussyCommand
