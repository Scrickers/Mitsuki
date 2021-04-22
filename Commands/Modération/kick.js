const { Command } = require('discord-akairo')

class kickCommand extends Command {
  constructor() {
    super('kick', {
      aliases: ['kick'],
      args: [{
        id: 'member',
        type: 'member',
        default: null,
        prompt: {
          start: "Merci, d'indiqué l'utilisateur que vous voulez kick",
          retry: "Merci, d'indiqué l'utilisateur que vous voulez kick"
        }
      }, {
        id: 'reasons',
        type: 'String',
        default: 'Aucune raison donnée'
      }],
      description: {
        usage: 'kick [User] <raison> ',
        examples: ['kick scricker', 'kick scricker "Attaque raid" '],
        description: 'kick un utilisateur'
      },
      cooldown: 1000,
      ratelimit: 3,
      userPermissions: ['KICK_MEMBERS'],
      clientPermissions: ['KICK_MEMBERS']
    })
  }

  async exec(message, { member, reasons }) {
    member.kick({
      reason: reasons
    })
      .then(() => {
        message.util.send({
          embed: {
            color: 0x36393f,
            timestamp: new Date(),
            footer: {
              icon_url: this.client.user.avatarURL(),
              text: this.client.user.username
            },
            fields:
              [{
                name: 'kick',
                value: `**${member.user.tag}**`
              }, {
                name: 'par',
                value: `**${message.author.tag}**`
              }, {
                name: 'Raison',
                value: `**${reasons}**`
              }
              ]
          }
        })
      })
      .catch(() => {
        message.reply('Je ne peux pas ban cet utilisateur!')
      })
  }
}

module.exports = kickCommand
