const { Command } = require('discord-akairo')
const { inspect } = require('util')

class evalCommand extends Command {
  constructor() {
    super('eval', {
      aliases: ['eval'],
      args: [
        {
          id: 'args',
          type: "string",
          match: "rest"
        }
      ],
      cooldown: 1000,
      ratelimit: 3,
      ownerOnly: true
    })
  }

  async exec(message, { args }) {
    const client = this.client
    const code = message.attachments.first() || args
    if (!code) return
    const token = client.token.split('').join('[^]{0,2}')
    const rev = client.token.split('').reverse().join('[^]{0,2}')
    const filter = new RegExp(`${token}|${rev}`, 'g')

    try {
      let output = eval(code)

      if (
        output instanceof Promise ||
        (Boolean(output) &&
          typeof output.then === 'function' &&
          typeof output.catch === 'function')
      ) { output = await output }

      output = inspect(output, {
        depth: 0,
        maxArrayLength: null
      })
      output = output.replace(filter, '[TOKEN]')
      output = clean(output)

      if (output.length < 1950) {
        return message.util.send(`\`\`\`js\n${output}\n\`\`\``)
      } else {
        return message.util.send(`${output}`, {
          split: '\n',
          code: 'js'
        })
      }
    } catch (error) {
      return message.util.send(
        `The following error occured \`\`\`js\n${error}\`\`\``
      )
    }

    function clean(text) {
      return text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
    }
  }
}

module.exports = evalCommand
