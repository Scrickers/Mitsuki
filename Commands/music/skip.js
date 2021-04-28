const { Command } = require('discord-akairo')

class skipCommand extends Command {
  constructor() {
    super('skip', {
      aliases: ['skip', "s"],
      args: [],
      description: {
        usage: 'skip',
        examples: ['skip'],
        description: 'skip une musique'
      },
      cooldown: 6000,
      ratelimit: 3
    })
  }

  async exec(message) {
    if (!message.member.voice.channelID) return message.util.send("Vous devez rejoindre un salon vocal")
    const dispatcher = this.client.queue.get(message.guild.id)
    if (!dispatcher) return message.util.send("Je ne joue actuellement pas dans votre serveur")

    if (dispatcher.player.voiceConnection.voiceChannelID !== message.member.voice.channelID) return message.util.send("Vous devez etre dans le meme channel que le bot")
    if (dispatcher.player.loop) return message.util.send("Le mode loop est activé vous ne pouvez pas skip cette musique !")
    dispatcher.player.stopTrack()
  }
}

module.exports = skipCommand