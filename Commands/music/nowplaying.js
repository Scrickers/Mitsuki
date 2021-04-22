const { Command } = require('discord-akairo')

class playCommand extends Command {
  constructor() {
    super('nowplaying', {
      aliases: ['nowplaying', "np"],
      args: [],
      description: {
        usage: 'nowplaying',
        examples: ['nowplaying'],
        description: 'Donne des information sur l\'avancement de la musique'
      },
      cooldown: 3000,
      ratelimit: 3
    })
  }

  async exec(message, { search }) {

    const sc = message.attachments.first() || search

    const { channel } = message.member.voice
    if (!channel) return message.util.send("Vous devez rejoindre un salon vocal avant")
    const node = this.client.shoukaku.getNode();
    if (this.checkURL(sc)) {
      const result = await node.rest.resolve(sc);
      if (!result) return message.util.send("Aucunes musique n'a été trouvé")
      const { type, tracks, playlistName } = result
      const track = tracks.shift()
      const isPlaylist = type === "PLAYLIST"
      const res = await this.client.queue.handle(node, track, message)
      if (isPlaylist) {
        for (const track of tracks) await this.client.queue.handle(node, track, message)
      }
      message.util.send(isPlaylist ? `La playlist ${playlistName} a été ajouté a la queue` : `Musique ajouté: ${track.info.title}`)
      if (res) await res.play()
      return
    }
    const searchData = await node.rest.resolve(sc, "youtube")
    console.log(searchData);
    if (!searchData.tracks.length) return message.util.send("Aucunes musique n'a été trouvé")
    const track = searchData.tracks.shift()
    const res = await this.client.queue.handle(node, track, message)
    message.util.send(`Musique ajouté: ${track.info.title}`)
    if (res) await res.play()
  }
  checkURL(string) {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = playCommand