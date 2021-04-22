const { Listener } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')

class MissingPermissionsListener extends Listener {
  constructor() {
    super('missingPermissions', {
      emitter: 'commandHandler',
      event: 'missingPermissions'
    })
  }

  exec(message, command, type, missing) {
    if (type === 'client') {
      const result = missingPermissions(message.guild.me, missing)
      const embed = new MessageEmbed()
        .setColor(this.client.colors.red)
        .setDescription(`${this.client.emojis.cache.get('711203679134285856')} Je n'ai pas les permissions suivantes: \`${result}\` pour la commandes: \`${command}\`.`)
      return message.channel.send({ embed })
    } else if (type === 'user') {
      const result = missingPermissions(message.member, missing)
      const embed = new MessageEmbed()
        .setColor(this.client.colors.red)
        .setDescription(`${this.client.emojis.cache.get('711203679134285856')} Vous n'avez pas les permissions suivantes: \`${result}\` pour la commandes: \`${command}\`.`)
      return message.channel.send({ embed })
    }
  }
}

const missingPermissions = (usr, permissions) => {
  const missingPermissions = usr.permissions.missing(permissions)
    .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``)

  return missingPermissions.length > 1
    ? `${missingPermissions.slice(0, -1).join(', ')} and ${missingPermissions.slice(-1)[0]}`
    : missingPermissions[0]
}

module.exports = MissingPermissionsListener
