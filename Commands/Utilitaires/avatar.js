const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')

class AvatarCommand extends Command {
  constructor() {
    super('avatar', {
      aliases: ['avatar', 'av', 'pfp', 'pdp'],
      args: [{
        id: 'member', type: 'member', default: _ => _.member
      }],
      description: {
        usage: 'avatar < @Mention | id | username >',
        examples: ['avatar @scricker', 'avatar 328892873699360772', 'avatar scricker'],
        description: 'affiche l\'avatar'
      },
      cooldown: 3000,
      ratelimit: 3
    })
  }

  exec(message, { member }) {
    const embed = new MessageEmbed()
      .setColor(this.client.colors.defaultColor)
      .setTitle(`avatar de ${member.user.tag}`)
      .setURL(member.user.displayAvatarURL())
      .setImage(member.user.displayAvatarURL({ size: 2048 }))

    return message.util.send({ embed })
  }
}

module.exports = AvatarCommand
