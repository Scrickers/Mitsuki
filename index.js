const { AkairoClient, CommandHandler, ListenerHandler, ClientUtil, Command } = require('discord-akairo')
const BotColors = require('./Util/Colors');
const { Shoukaku } = require('shoukaku');
const Queue = require("./Util/queue")
require('dotenv').config();

const LavalinkServer = [{ name: 'Localhost', host: 'Localhost', port: 2333, auth: "youshallnotpass" }];

const ShoukakuOptions = { moveOnDisconnect: false, resumable: false, resumableTimeout: 30, reconnectTries: 2, restTimeout: 10000 };

class MitsukiClient extends AkairoClient {
  constructor() {
    super({ ownerID: '328892873699360772' }, {
      messageCacheMaxSize: 0,
      fetchAllMembers: true
    })
    this.commandHandler = new CommandHandler(this, {
      allowMention: true,
      prefix: async message => {
        if (message.guild) {
          return (await require("./Util/database").getGuild(message.guild.id)).Prefix;
        }
        return process.env.PREFIX
      },
      classToHandle: Command,
      commandUtil: true,
      handleEdits: true,
      argumentDefaults: {
        prompt: {
          modifyStart: (message, str) => `${message.author}, ${str}\n\nEnvoyé: \`cancel\` pour arreté la commandes...`,
          modifyRetry: (message, str) => `${message.author}, ${str}\n\nEnvoyé: \`cancel\` pour arreté la commandes...`,
          cancel: 'Vous avez cancel la commandes.',
          timeout: 'Vous avez mis trop de temps a repondre, la commandes a été arreté...',
          ended: 'Vous avez ressayé trop de fois, la commandes a été arreté...',
          retries: 4,
          time: 30000
        },
        otherwise: ''
      },
      ignoreCooldown: this.ownerID,
      ignorePermissions: this.ownerID,
      automateCategories: true,
      defaultCooldown: 2000,
      commandUtilLifetime: 300000,
      directory: './Commands/'
    })

    this.listenerHandler = new ListenerHandler(this, {
      directory: './Listeners/'
    })

    this.colors = BotColors
    this.util = new ClientUtil(this)
    this.commandHandler.useListenerHandler(this.listenerHandler)
    this.commandHandler.loadAll()
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process: process
    })
    this.listenerHandler.loadAll()
    this.shoukaku = new Shoukaku(this, LavalinkServer, ShoukakuOptions)
    this.queue = new Queue(this)
  }

  async start() {
    require('./Extensions/message')
    super.login(process.env.TOKEN)
  }
}

const client = new MitsukiClient()
client.start()
