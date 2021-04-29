const { Command } = require('discord-akairo')
const data = require("../../Util/database")

class listCommand extends Command {
  constructor() {
    super('list', {
      aliases: ['list'],
      args: [],
      description: {
        usage: 'list',
        examples: ['lists'],
        description: 'indique tous les faction present sur le serveur'
      },
      cooldown: 8000,
      ratelimit: 3,
      userPermissions: [],
    })
  }

  async exec(message) {
    const facs = await data.all("SELECT * FROM Kuran WHERE ServerId = ? ORDER BY Points DESC;", [message.guild.id])
    const embed = {
      title: "Voici la list des faction sur le serveur",
      fields: []
    }
    for (let i = 0; i < facs.length; i++) {
      embed.fields.push(
        {
          name: facs[i].Name,
          value: `Membre => ${(await data.all("SELECT * FROM Users WHERE KuranId = ?;", [facs[i].KuranId])).length}${facs[i].MaxMember !== -1 ? `/${facs[i].MaxMember}` : ""} | Points => ${facs[i].Points}`
        })
    }
    message.util.send({ embed: embed })
  }
}

module.exports = listCommand
