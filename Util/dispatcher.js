class Dispatcher {
  constructor(options) {

    this.client = options.client;
    this.guild = options.guild;
    this.message = options.message;
    this.player = options.player;
    this.queue = [];
    this.current = null;

    this.player.on('start', () => {
      console.log(this.current);
      if (!this.player.loop) this.message.util.send(`Musique en cours: **${this.current.info.title}**`)
        .catch(() => null)
    }
    );
    this.player.on('end', async () => {
      console.log(this.current);
      if (this.player.loop) await this.client.queue.handle(this.client.shoukaku.getNode(), this.current, this.message)
      this.play()
        .catch(() => {
          this.queue.length = 0;
          this.destroy();
        });
    });
    for (const playerEvent of ['closed', 'error', 'nodeDisconnect']) {
      this.player.on(playerEvent, () => {
        this.queue.length = 0;
        this.destroy();
      });
    }
  }

  get exists() {
    return this.client.queue.has(this.guild.id);
  }

  async play() {
    if (!this.exists || !this.queue.length) return this.destroy();
    this.current = this.queue.shift();
    await this.player.playTrack(this.current.track);
  }

  destroy() {
    this.queue.length = 0;
    this.player.disconnect();
    this.client.queue.delete(this.guild.id);
  }
}
module.exports = Dispatcher;