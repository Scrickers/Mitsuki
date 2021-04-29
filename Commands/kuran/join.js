const { Command } = require('discord-akairo')
const data = require("../../Util/database")

class joinCommand extends Command {
  constructor() {
    super('join', {
      aliases: ['join'],
      args: [{
        id: 'name',
        type: 'string',
        default: null,
        prompt: {
          start: "Merci, d'indiqué la faction que vous voulez rejoindre",
          retry: "Merci, d'indiqué la faction que vous voulez rejoindre"
        }
      }],
      description: {
        usage: 'join',
        examples: ['join [Name]'],
        description: 'Permet de rejoindre une faction'
      },
      cooldown: 8000,
      ratelimit: 3,
      userPermissions: [],
    })
  }

  async exec(message, { name }) {
    const user = await data.getUser(message.author.id, message.guild.id)
    if (user.KuranId) return message.util.send("Vous avez deja une faction")
    const fac = await data.get("SELECT * FROM Kuran WHERE ServerId = ? AND Name = ?;", [message.guild.id, name])
    if (!fac) return message.util.send(`Aucune faction avec le nom ${name} a été trouvé`)
    await data.run(
      `UPDATE Users SET KuranId = ?, KuranJoin = ? WHERE UserId = ? AND ServerId = ?;`,
      [fac.KuranId, Date.now(), message.author.id, message.guild.id]
    );
    message.util.send(`Vous avez bien rejoint la faction ${name}`)
  }
}

module.exports = joinCommand
