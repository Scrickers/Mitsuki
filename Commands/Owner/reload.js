const { Command } = require('discord-akairo')
const { inspect } = require('util')

class evalCommand extends Command {
  constructor() {
    super('reload', {
      aliases: ['reload'],
      args: [
        {
          id: 'commandes',
          type: "string"
        }
      ],
      cooldown: 1000,
      ratelimit: 3,
      ownerOnly: true
    })
  }

  async exec(message, { commandes }) {
    this.handler.reload(commandes)
    return message.reply(`La commandes ${commandes} a été rechargé`)
  }
}

module.exports = evalCommand
