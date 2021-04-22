const { Command } = require('discord-akairo')

class purgeCommand extends Command {
  constructor() {
    super('purge', {
      aliases: ['purge'],
      args: [{
        id: 'purge',
        type: 'number',
        default: null,
        prompt: {
          start: "Merci, d'indiqué le nombre de message a supprimé ",
          retry: "Merci,  d'indiqué le nombre de message a supprimé "
        }
      }],
      description: {
        usage: 'purge [number] ',
        examples: ['purge ', 'purge 10'],
        description: 'Supprime des messages'
      },
      cooldown: 10000,
      ratelimit: 3,
      userPermissions: ['MANAGE_MESSAGES'],
      clientPermissions: ['MANAGE_MESSAGES']
    })
  }

  async exec(message, { purge }) {
    if (purge < 2 || purge > 100) return message.util.send("Vous devez choisir un nombre entre 2 et 500")
    const deleted = await message.channel.messages.fetch({ limit: purge })
    const deleteds = await deleted.filter(x => Date.now() - x.createdTimestamp < 14 * 24 * 60 * 60 * 1000);
    await message.delete() && message.channel.bulkDelete(deleteds);
    message.util.send(`${deleteds.size}/${deleted.size} messages ont été supprimé`)
  }
}
module.exports = purgeCommand