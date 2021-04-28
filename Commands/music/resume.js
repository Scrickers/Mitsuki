const { Command } = require('discord-akairo')

class resumeCommand extends Command {
  constructor() {
    super('resume', {
      aliases: ['resume'],
      args: [],
      description: {
        usage: 'resume',
        examples: ['resume'],
        description: 'reprend la lecture d\'une musique'
      },
      cooldown: 5000,
      ratelimit: 3
    })
  }

  async exec(message) {
    if (!message.member.voice.channelID) return message.util.send("Vous devez rejoindre un salon vocal")
    const dispatcher = this.client.queue.get(message.guild.id)
    if (!dispatcher) return message.util.send("Je ne joue actuellement pas dans votre serveur")
    if (!dispatcher.player.paused) {
      message.util.send("La musique n'étant pas sur pause, elle a été mise sur pause.")
      dispatcher.player.setPaused(true)
    } else {
      message.util.send("La musique à bien repris")
      dispatcher.player.setPaused(false)
    }
  }
}

module.exports = resumeCommand