const { Command } = require('discord-akairo')

class muteCommand extends Command {
  constructor() {
    super('mute', {
      aliases: ['mute'],
      args: [{
        id: 'user',
        type: 'member',
        default: null,
        prompt: {
          start: "Merci, d'indiqué la personne à mute",
          retry: "Merci, d'indiqué la personne à mute"
        }
      }],
      description: {
        usage: 'mute [user] ',
        examples: ['mute', 'mute scricker'],
        description: 'rend muet une personne'
      },
      cooldown: 4000,
      ratelimit: 3,
      userPermissions: ['MANAGE_ROLES'],
      clientPermissions: ['MANAGE_CHANNELS', 'MANAGE_ROLES']
    })
  }

  async exec(message, { user }) {
    if (user.roles.cache.find(x => x.name === "Muet")) return message.util.send(`${user.user.username} est deja muet`)
    let role = message.guild.roles.cache.find(x => x.name === "Muet")
    if (!role) {
      role = await message.guild.roles.create({ data: { name: "Muet", color: require("../../Util/Colors").defaultColor } })
      await message.guild.channels.cache.map(x => x.createOverwrite(role.id, { SEND_MESSAGES: false }))
    }
    user.roles.add(role.id)
    message.util.send(`${user.user.username} n'a plus le droit à la parole`)
  }
}

module.exports = muteCommand