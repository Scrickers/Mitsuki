const { Command } = require('discord-akairo')
const data = require("../../Util/database")

class createCommand extends Command {
  constructor() {
    super('create', {
      aliases: ['create'],
      args: [{
        id: 'name',
        type: 'string',
        default: null,
        prompt: {
          start: "Merci, d'indiqué le nom de la faction",
          retry: "Merci, d'indiqué le nom de la faction"
        }
      }],
      description: {
        usage: 'create [Nom]',
        examples: ['create Teams'],
        description: 'Créer une faction'
      },
      cooldown: 8000,
      ratelimit: 3,
      userPermissions: ['MANAGE_GUILD'],
    })
  }

  async exec(message, { name }) {
    const user = await data.getUser(message.author.id, message.guild.id)
    if (user.KuranId) return message.util.send("Vous avez déjà une faction.")
    let fac = await data.get("SELECT * FROM Kuran WHERE Name = ? AND ServerId = ?;", [name, message.guild.id])
    if (fac) return message.util.send(`La faction avec le nom ${name} existe déjà.`)
    const role = await message.guild.roles.create({ data: { name: name, color: "#" + Math.floor(Math.random() * 16777215).toString(16) } })

    await data.run(`INSERT INTO Kuran (OwnerID, ServerId, RoleId, Name, Avatar, Description, Type, MaxMember, Created, Points)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [message.author.id, message.guild.id, role.id, name, "", "", 0, -1, Date.now(), 0])

    fac = await data.get("SELECT * FROM Kuran WHERE Name = ? AND ServerId = ? AND OwnerID = ?;", [name, message.guild.id, message.author.id])
    message.member.roles.add(role.id)
    await data.run(
      `UPDATE Users SET KuranId = ?, KuranJoin = ? WHERE UserId = ? AND ServerId = ?;`,
      [fac.KuranId, Date.now(), message.author.id, message.guild.id]
    );

    message.util.send(`Votre faction ${name} a été créé.`)
  }
}

module.exports = createCommand
