const { Command } = require('discord-akairo')

class massRemcommand extends Command {
  constructor() {
    super('massrem', {
      aliases: ['massrem', 'mr', 'removeroleall', 'delroleall'],
      args: [{
        id: 'role',
        type: 'role',
        default: null,
        prompt: {
          start: "Merci, d'indiqué le role que vous voulez donner",
          retry: "Merci, d'indiqué le role que vous voulez donner"
        }
      }],
      description: {
        usage: 'massadd [role]',
        examples: ['massadd admin'],
        description: 'Donne un role a tous les utilisateurs'
      },
      cooldown: 30000,
      ratelimit: 3,
      userPermissions: ['MANAGE_ROLES'],
      clientPermissions: ['MANAGE_ROLES']
    })
  }

  async exec(message, { role }) {
    let i = 0; let o = 0
    const users = message.guild.members.cache.filter(a => a.roles.cache.get(role.id))
    message.util.send(`je vais enlever le rôle ${role.name} à ${users.size} membres ... cela pourrait prendre un certain temps ...`)
    const promises = users.map((user) => user.roles.remove(role.id).then(() => {
      i++
    }).catch(() => {
      o++
    }))

    await Promise.all(promises)
    if (i === 0) return message.util.send(`Personnes n'a perdu le role ${role.name}`)
    message.util.send(`${i} utilisateur${i > 1 ? 's ont' : ' à'} perdu le role ${role.name} ${o > 0 ? `utilisateur${o > 1 ? 's' : ''} n'ont pas pu voir leur role enlever` : ''}`)
  }

}

module.exports = massRemcommand
