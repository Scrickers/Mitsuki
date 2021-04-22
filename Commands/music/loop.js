const { Command } = require('discord-akairo')
class playCommand extends Command {
  constructor() {
    super('loop', {
      aliases: ['loop'],
      args: [],
      description: {
        usage: 'loop',
        examples: ['loop'],
        description: 'repete une musique jusqu\'a temps que le mode loop soit desactivé '
      },
      cooldown: 3000,
      ratelimit: 3
    })
  }

  async exec(message) {
    const dispatcher = this.client.queue.get(message.guild.id)
    if (!dispatcher) return message.util.send("Je ne joue actuellement pas dans votre serveur")
    if (!dispatcher.player.loop) {
      dispatcher.player.loop = true
      return message.util.send("Vous avez activé le mode loop")
    }
    else {
      dispatcher.player.loop = false
      return message.util.send("Vous avez desactivé le mode loop")
    }
  }
}

module.exports = playCommand