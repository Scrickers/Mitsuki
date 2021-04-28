const { Command } = require('discord-akairo')
const { duration } = require("../../Util/Functions")
class nowPlayingCommand extends Command {
  constructor() {
    super('nowplaying', {
      aliases: ['nowplaying', "np"],
      args: [],
      description: {
        usage: 'nowplaying',
        examples: ['nowplaying'],
        description: 'Donne des information sur la musique actuelle'
      },
      cooldown: 6000,
      ratelimit: 1
    })
  }

  async exec(message) {
    const dispatcher = this.client.queue.get(message.guild.id)
    if (!dispatcher) return message.util.send("Je ne joue actuellement pas dans votre serveur")

    const durations = dispatcher.current.info.length;
    const progression = dispatcher.player.position;
    const progressBar = [
      "▬",
      "▬",
      "▬",
      "▬",
      "▬",
      "▬",
      "▬",
      "▬",
      "▬",
      "▬",
      "▬",
      "▬",
      "▬",
      "▬",
      "▬",
      "▬"
    ];
    const calcul = Math.round(
      progressBar.length *
      (progression / 1000 / (durations / 1000))
    );
    progressBar[calcul] = "🔘";
    const times = time(progression, durations)
    return message.util.send({
      embed: {
        description:
          `[${dispatcher.current.info.title}](${dispatcher.current.info.uri})\n\n\`[` +
          times[0] +
          "]` " +
          progressBar.join("") +
          " `[" +
          times[1] +
          "]`",
        color: 0x36393f,
        timestamp: new Date(),
        footer: {
          text: `Ajouté par: ${dispatcher.current.user.username}`
        },
        thumbnail: {
          url: `https://img.youtube.com/vi/${dispatcher.current.info.identifier}/maxresdefault.jpg`
        }
      }
    })
  }
}
function time(progression, durations) {
  if (durations > 60 * 60 * 1000) {
    return [`${duration(progression)[2]}:${duration(progression)[1].length == 1 ? "0" + duration(progression)[1] : duration(progression)[1]}:${duration(progression)[0].length == 1 ? "0" + duration(progression)[0] : duration(progression)[0]}`, `${duration(durations)[2]}:${duration(durations)[1]}:${duration(durations)[0]}`]
  } else if (durations > 60 * 1000) {
    return [`${duration(progression)[1]}:${duration(progression)[0].length == 1 ? "0" + duration(progression)[0] : duration(progression)[0]}`, `${duration(durations)[1]}:${duration(durations)[0]}`]
  } else {
    return [duration(progression)[0].length == 1 ? "0" + duration(progression)[0] : duration(progression)[0], duration(durations)[0].length == 1 ? "0" + duration(durations)[0] : duration(durations)[0]]
  }
}

module.exports = nowPlayingCommand