const { Listener } = require('discord-akairo');
const database = require('../../Util/database');

class guildMemberRemoveListener extends Listener {
  constructor() {
    super('guildMemberRemove', {
      emitter: 'client',
      event: 'guildMemberRemove'
    })
  }

  async exec(member) {
    const user = await database.getUser(member.user.id, member.guild.id)
    if (!member.guild) return
    if (!user.KuranId) return
    const fac = await database.get("SELECT * FROM Kuran WHERE ServerId = ? AND KuranId = ?;", [member.guild.id, user.KuranId])

    await database.run(
      `UPDATE Users SET KuranId = ?, KuranJoin = ? WHERE UserId = ? AND ServerId = ?;`,
      [0, 0, member.user.id, member.guild.id]
    );

    if (fac.OwnerID === member.user.id) {
      if ((await database.all("SELECT * FROM Users WHERE KuranId = ?;", [fac.KuranId])).length === 0) {
        member.guild.roles.cache.get(fac.RoleId).delete()
        database.run("DELETE FROM Kuran WHERE KuranId = ?;", [user.KuranId])
      }
      else {
        await database.run(
          `UPDATE Kuran SET OwnerID = ? WHERE KuranId = ?;`,
          [(await database.all("SELECT * FROM Users WHERE KuranId = ? ORDER BY KuranJoin;", [fac.KuranId]))[0].UserId, user.KuranId])
      }
    }
  }
}

module.exports = guildMemberRemoveListener
