const { Command } = require('discord-akairo')

class lockdownCommand extends Command {
  constructor() {
    super('lockdown', {
      aliases: ['lockdown'],
      args: [{
        id: 'start',
        type: 'string',
        default: null,
        prompt: {
          start: "Merci, d'indiqué si vous voulez commencé (start) ou arreté (stop) le Blocage du salon ",
          retry: "Merci, d'indiqué si vous voulez commencé (start) ou arreté (stop) le Blocage du salon "
        }
      }],
      description: {
        usage: 'purge [number] ',
        examples: ['purge ', 'purge 10'],
        description: 'Supprime des messages'
      },
      cooldown: 10000,
      ratelimit: 3,
      userPermissions: ['MANAGE_CHANNELS'],
      clientPermissions: ['MANAGE_CHANNELS']
    })
  }

  async exec(message, { start }) {
    if (start.toLowerCase() == "start" || start.toLowerCase() == "stop") {
      console.log(message.channel.permissionsFor(message.guild.id).has("SEND_MESSAGES"));
      switch (start.toLowerCase()) {
        case "start":
          if (!message.channel.permissionsFor(message.guild.id).has("SEND_MESSAGES")) {
            return message.util.send(`Je suis vraiment désolé mais ce salon est deja blocker`)
          }
          message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
          })
          message.util.send(`L'envoie de message a été blocké pour tous les utilisateurs du discord par ${message.author.tag}`)
          break;

        case "stop":
          if (message.channel.permissionsFor(message.guild.id).has("SEND_MESSAGES")) {
            return message.util.send(`Les utilisateurs avait deja la parole`)
          }
          message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: null
          })
          message.util.send(`Vous pouvez de nouveau envoyé des message dans ce salon`)
          break;
      }
    } else { return message.util.send("Vous devez indiqué si vous voulez commencé (start) ou arreté (stop) le Blocage du salon") }
  }
}

module.exports = lockdownCommand