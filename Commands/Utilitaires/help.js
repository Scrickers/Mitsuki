const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const { formatName } = require('../../Util/Functions')

class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help', 'h', 'halp', 'commands'],
      args: [{
        id: 'command', type: 'commandAlias', match: 'content', default: null
      }],
      description: {
        usage: 'help < command >',
        examples: ['help', 'comands', 'h'],
        description: 'affiche les commandes du bot'
      },
      cooldown: 3000,
      ratelimit: 3
    })
  }

  async exec(message, { command }) {
    if (!command) {
      const embed = new MessageEmbed()
      this.handler.categories.forEach((cm, category) => {
        const dirSize = cm.filter(cmd => cmd.category === cm)
        let mappedOut = cm.map(x => `\`${x}\``).join(', ')
        if (!(category === 'Owner' && (!this.client.ownerID.includes(message.author.id)))) {
          embed.addField(`${dirSize.size} | **Commands ${category}**`, !message.channel.nsfw && category === "nsfw" ? "Vous devez etre dans un salon NSFW pour voir les commandes" : mappedOut)
            .setColor(this.client.colors.defaultColor)
            .setAuthor(`Help Menu | ${message.guild.name}`, message.guild.iconURL())
        }
      })

      return message.util.send({ embed })
    } else if (command) {
      const cmd = command
      const embed = new MessageEmbed()
        .setColor(this.client.colors.defaultColor)
        .setAuthor(`Help: ${formatName(cmd.aliases[0])} | ${message.guild.name}`, message.guild.iconURL())
        .setDescription(`
                            **Nom**: \`${cmd.aliases[0]}\`
                            **Aliases**: ${`${cmd.aliases.map(x => `\`${x}\``).join(', ') || 'No Alias'}`}
                            **Cooldown**: \`${cmd.cooldown / 1000 + 's' || 0}\`
                            **Ratelimit**: \`${cmd.ratelimit || 0}\`

                            **Description**: ${cmd.description.description || 'A command'}
                            **Usage**: \`${cmd.description.usage || cmd.alises[0]}\`
                            **Examples**:\n\`\`\`${cmd.description.examples.join('\n') || cmd.aliases[0]}\`\`\``)
        .setFooter('Syntax: [requis] : <option>')
      return message.util.send({ embed })
    }
  }
}

module.exports = HelpCommand
