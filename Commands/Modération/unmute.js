const { Command } = require('discord-akairo')

class unMuteCommand extends Command {
  constructor() {
    super('unmute', {
      aliases: ['unmute'],
      args: [{
        id: 'user',
        type: 'member',
        default: null,
        prompt: {
          start: "Merci, d'indiqué la personne à unmute",
          retry: "Merci, d'indiqué la personne à unmute"
        }
      }],
      description: {
        usage: 'unmute [user] ',
        examples: ['unmute', 'unmute scricker'],
        description: 'redonne la permission de parlé a une personne'
      },
      cooldown: 4000,
      ratelimit: 3,
      userPermissions: ['MANAGE_ROLES'],
      clientPermissions: ['MANAGE_CHANNELS']
    })
  }

  async exec(message, { user }) {
    if (!user.roles.cache.find(x => x.name === "Muet")) return message.util.send(`${user.user.username} n'est pas muet`)
    let role = message.guild.roles.cache.find(x => x.name === "Muet")
    user.roles.remove(role.id)
    message.util.send(`${user.user.username} a de nouveau le droit à la parole`)
  }
}

module.exports = unMuteCommand