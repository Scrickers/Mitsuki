const { Command } = require('discord-akairo')
const { nsfw } = require('../../Util/Functions')

class yuriCommand extends Command {
  constructor() {
    super('yuri', {
      aliases: ['yuri'],
      args: [],
      description: {
        usage: 'yuri',
        examples: ['yuri'],
        description: ''
      },
      cooldown: 3000,
      ratelimit: 3
    })
  }

  exec(message) {
    nsfw(message, "yuri")
  }
}

module.exports = yuriCommand
