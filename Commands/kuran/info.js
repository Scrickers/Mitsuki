const { Command } = require('discord-akairo')
const data = require("../../Util/database")

class infoCommand extends Command {
  constructor() {
    super('info', {
      aliases: ['info'],
      args: [{
        id: 'name',
        type: 'string',
      }],
      description: {
        usage: 'info <Nom>',
        examples: ['info', 'info Teams'],
        description: 'Donne des informations sur une faction.'
      },
      cooldown: 8000,
      ratelimit: 3,
      userPermissions: [],
    })
  }

  async exec(message, { name }) {
    let fac

    const user = await data.getUser(message.author.id, message.guild.id)
    if (!user.KuranId && !name) return message.util.send("Vous devez indiquer le nom de la faction.")
    if (!name) {
      fac = await data.get("SELECT * FROM Kuran WHERE KuranId = ?", [user.KuranId])
    }
    else {
      fac = await data.get("SELECT * FROM Kuran WHERE Name = ? AND ServerId = ?;", [name, message.guild.id])
    }
    const date = new Date(fac.Created)
    message.util.send({
      embed: {
        title: `Information de la faction ${fac.Name}`,
        description: fac.description || "Aucune description pour cette faction",
        timestamp: new Date(),
        thumbnail: {
          url: fac.Avatar || "https://taobabe.files.wordpress.com/2013/01/anime-girl-questionmark.jpg?w=300&h=240"
        },
        fields: [{
          name: "Chef",
          value: this.client.users.cache.get(fac.OwnerID).username,
          inline: true
        },
        {
          name: "Membres",
          value: (await data.all("SELECT * FROM Users WHERE KuranId = ?;", [fac.KuranId])).length,
          inline: true
        },
        {
          name: "crée le",
          value: date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + date.getMinutes() || "erreur",
          inline: true
        },
        {
          name: "Points",
          value: fac.Points || "0",
          inline: true
        }
        ]
      }
    })
  }
}
module.exports = infoCommand
