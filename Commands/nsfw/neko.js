const { Command } = require('discord-akairo')
const { nsfw } = require('../../Util/Functions')

class nekoCommand extends Command {
  constructor() {
    super('neko', {
      aliases: ['neko'],
      args: [],
      description: {
        usage: 'neko',
        examples: ['neko'],
        description: ''
      },
      cooldown: 3000,
      ratelimit: 3
    })
  }

  exec(message) {
    nsfw(message, "neko")
  }
}

module.exports = nekoCommand
