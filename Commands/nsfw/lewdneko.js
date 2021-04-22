const { Command } = require('discord-akairo')
const { nsfw } = require('../../Util/Functions')

class lewdNekoCommand extends Command {
  constructor() {
    super('lewdneko', {
      aliases: ['lewdneko'],
      args: [],
      description: {
        usage: 'lewdneko',
        examples: ['lewdneko'],
        description: ''
      },
      cooldown: 3000,
      ratelimit: 3
    })
  }

  exec(message) {
    nsfw(message, "lewdneko")
  }
}

module.exports = lewdNekoCommand
