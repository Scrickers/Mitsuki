const { Command } = require('discord-akairo')
const { nsfw } = require('../../Util/Functions')

class boobsCommand extends Command {
  constructor() {
    super('boobs', {
      aliases: ['boob', "boobs"],
      args: [],
      description: {
        usage: 'boobs',
        examples: ['boobs'],
        description: ''
      },
      cooldown: 3000,
      ratelimit: 3
    })
  }

  exec(message) {
    nsfw(message, "boobs")
  }
}

module.exports = boobsCommand
