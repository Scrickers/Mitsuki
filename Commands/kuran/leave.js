const { Command } = require('discord-akairo')
const data = require("../../Util/database")

class leaveCommand extends Command {
  constructor() {
    super('leave', {
      aliases: ['leave'],
      args: [],
      description: {
        usage: 'leave',
        examples: ['leave'],
        description: 'Permet de quitté votre faction'

      },
      cooldown: 8000,
      ratelimit: 3,
      userPermissions: [],
    })
  }

  async exec(message) {
    const user = await data.getUser(message.author.id, message.guild.id)
    if (!user.KuranId) return message.util.send("Vous n'avez pas de faction")
    const fac = await data.get("SELECT * FROM Kuran WHERE ServerId = ? AND KuranId = ?;", [message.guild.id, user.KuranId])
    await data.run(
      `UPDATE Users SET KuranId = ?, KuranJoin = ? WHERE UserId = ? AND ServerId = ?;`,
      [0, 0, message.author.id, message.guild.id]
    );
    if (fac.OwnerID === message.author.id) {
      if ((await data.all("SELECT * FROM Users WHERE KuranId = ?;", [fac.KuranId])).length === 0) data.run("DELETE FROM Kuran WHERE KuranId = ?;", [user.KuranId])
      else (await data.all("SELECT * FROM Users WHERE KuranId = ? ORDER BY KuranJoin;", [fac.KuranId]))[0]
    }
    message.util.send(`Vous venez de quitté la faction ${fac.Name}`)
  }
}

module.exports = leaveCommand
