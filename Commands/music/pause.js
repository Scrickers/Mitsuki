const { Command } = require('discord-akairo')

class pauseCommand extends Command {
  constructor() {
    super('pause', {
      aliases: ['pause'],
      args: [],
      description: {
        usage: 'pause',
        examples: ['pause'],
        description: 'met la musique sur pause'
      },
      cooldown: 6000,
      ratelimit: 3
    })
  }

  async exec(message) {
    if (!message.member.voice.channelID) return message.util.send("Vous devez rejoindre un salon vocal")
    const dispatcher = this.client.queue.get(message.guild.id)
    if (!dispatcher) return message.util.send("Je ne joue actuellement pas dans votre serveur")
    if (dispatcher.player.paused) {
      message.util.send("La musique étant sur pause elle a repris")
      dispatcher.player.setPaused(false)
    } else {
      message.util.send("La musique a été mise sur pause.")
      dispatcher.player.setPaused(true)
    }
  }
}

module.exports = pauseCommand