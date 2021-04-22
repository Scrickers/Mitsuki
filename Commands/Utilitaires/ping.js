const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')

class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping', 'latency'],
      description: {
        usage: 'ping',
        examples: ['ping'],
        description: 'Pong! affiche la latence du bot'
      },
      cooldown: 2000,
      ratelimit: 3
    })
  }

  async exec(message) {
    const sent = await message.util.send('Pinging...')
    const timeDifference = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt)

    return message.util.send(
      new MessageEmbed()
        .setColor(this.client.colors.defaultColor)
        .setDescription(`**reponses**: \`${timeDifference}MS\`
                    **latence**: \`${Math.round(this.client.ws.ping)}MS\``)
    )
  }
}

module.exports = PingCommand
