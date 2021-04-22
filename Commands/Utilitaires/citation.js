const { Command } = require('discord-akairo')
const http = require("http")
class citationCommand extends Command {
  constructor() {
    super('citation', {
      aliases: ['citation'],
      args: [],
      description: {
        usage: 'citation',
        examples: ['citation'],
        description: 'Donne une citation au hasard'
      },
      cooldown: 3000,
      ratelimit: 3
    })
  }

  exec(message) {
    http.get(`http://163.172.234.199:925/api/v1/citation`, (resp) => {
      let citations = '';

      resp.on('data', (chunk) => {
        citations += chunk;
      });

      resp.on('end', () => {
        citations = JSON.parse(citations)
        message.util.send({
          embed: {
            description: citations.citation,
            color: 0x36393f,
            timestamp: new Date(),
            author: {
              name: citations.author,
              url: `https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=-1`
            },
            footer: {
              text: citations.Anime
            },
            image: {
              url: citations.images
            }
          }
        });
      });

    })
  }
}

module.exports = citationCommand
