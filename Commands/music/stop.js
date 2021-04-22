const { Command } = require('discord-akairo')

class stopCommand extends Command {
  constructor() {
    super('stop', {
      aliases: ['stop'],
      args: [],
      description: {
        usage: 'stop',
        examples: ['stop'],
        description: 'arrete une musique'
      },
      cooldown: 3000,
      ratelimit: 3
    })
  }

  async exec(message) {
    if (message.member.voice.channelID) return message.util.send("Vous devez rejoindre un salon vocal")
    const dispatcher = this.client.queue.get(message.guild.id)
    if (!dispatcher) return message.util.send("Je ne joue actuellement pas dans votre serveur")

    if (dispatcher.player.voiceConnection.voiceChannelID !== message.member.voice.channelID) return message.util.send("Vous devez etre dans le meme channel que le bot")

    dispatcher.queue.length = 0;
    dispatcher.player.stopTrack()
  }
}

module.exports = stopCommand