const { Command } = require('discord-akairo')

class updateCommand extends Command {
  constructor() {
    super('update', {
      aliases: ['update'],
      args: [

      ],
      description: {
        usage: 'addrole [User | role]',
        examples: ['kick scricker', 'kick scricker "Attaque raid" '],
        description: 'Donne un role a un utilisateur'
      },
      cooldown: 1000,
      ratelimit: 3,
      ownerOnly: true
    })
  }

  async exec(message) {
    this.handler.removeAll()
    console.log(require("child_process").execSync("git pull -f").toString());
    this.client.commandHandler.loadAll()
    message.util.send("Les commandes on été reload")
  }
}

module.exports = updateCommand
