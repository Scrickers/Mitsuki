const { Command } = require('discord-akairo')

class massAddCommand extends Command {
  constructor() {
    super('massadd', {
      aliases: ['massadd', 'ma', 'addroleall', 'roleall'],
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
    const users = message.guild.members.cache.filter(a => !a.roles.cache.get(role.id))
    message.util.send(`je vais ajouter le rôle ${role.name} à ${users.size} membres ... cela pourrait prendre un certain temps ...`)
    const promises = users.map((user) => user.roles.add(role.id).then(() => {
      i++
    }).catch(() => {
      o++
    }))

    await Promise.all(promises)
    if (i === 0) return message.util.send(`Personnes n'a eu le role ${role.name}`)
    message.util.send(`${i} nouveau utilisateur${i > 1 ? 's ont eux' : ' à eu'} le role ${role.name} ${o > 0 ? `utilisateur${o > 1 ? 's' : ''} n'ont pas pu avoir le role` : ''}`)
  }

}

module.exports = massAddCommand
