const { Listener } = require('discord-akairo')

class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    })
  }

  async exec() {
    const statuses = [
      `m!help | ${this.client.users.cache.size} users`,
      `m!help | ${this.client.guilds.cache.size} guilds`,
    ]; let i = 0

    this.client.user.setStatus('dnd')
    setInterval(() => {
      this.client.user.setActivity(statuses[i++ % statuses.length], { type: 'PLAYING' })
    }, 15 * 1000)


    console.log(`${this.client.user.tag} est en ligne`)


  }
}

module.exports = ReadyListener
