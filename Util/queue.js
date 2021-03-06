const Dispatcher = require("./dispatcher")

class Queue extends Map {
  constructor(client, iterable) {
    super(iterable);
    this.client = client
  }

  async handle(node, track, message) {
    track.user = message.author
    const exist = this.get(message.guild.id)
    if (!exist) {
      const player = await node.joinVoiceChannel({
        guildID: message.guild.id,
        voiceChannelID: message.member.voice.channelID
      })
      const dispatcher = new Dispatcher({
        client: this.client,
        guild: message.guild,
        message: message,
        player
      });
      dispatcher.queue.push(track);
      this.set(message.guild.id, dispatcher);
      return dispatcher;
    }
    exist.queue.push(track);
    return null;
  }
}
module.exports = Queue
