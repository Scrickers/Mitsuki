const { Command } = require('discord-akairo')

class removeRoleCommand extends Command {
  constructor() {
    super('removerole', {
      aliases: ['removerole', 'rr'],
      args: [{
        id: 'member',
        type: 'member',
        default: null,
        prompt: {
          start: "Merci, d'indiqué l'utilisateur à lequel vous voulez enlever le rôle",
          retry: "Merci, d'indiqué l'utilisateur à lequel vous voulez enlever le rôle"
        }
      }, {
        id: 'role',
        type: 'role',
        default: null,
        prompt: {
          start: "Merci, d'indiqué le role que vous voulez enlevé",
          retry: "Merci, d'indiqué le role que vous voulez enlevé"
        }
      }],
      description: {
        usage: 'removerole [User] [Role]',
        examples: ['removerole scricker admin'],
        description: 'Enleve un role a un utilisateur'
      },
      cooldown: 2000,
      ratelimit: 3,
      userPermissions: ['MANAGE_ROLES'],
      clientPermissions: ['MANAGE_ROLES']
    })
  }

  async exec(message, { member, role }) {
    if (!member.roles.cache.get(role.id)) return message.util.send(`${message.author.id === member.id ? "Vous n'avez" : `${message.author.username} n'a`} pas le role ${role.name}`)
    return member.roles.remove(role.id).then(() => {
      return message.util.send(`${message.author.id === member.id ? "Vous n'avez" : `${message.author.username} n'a`} plus le role ${role.name}`)
    }).catch(() => {
      return message.util.send(`le role ${role.name} ne peut pas ${message.author.id === member.id ? 'vous etre' : 'etre'} enlevé ${message.author.id === member.id ? '' : `à ${member.user.username}`}`)
    })
  }
}

module.exports = removeRoleCommand
