require('dotenv').config()

const Discord = require("discord.js")
const { readdirSync } = require("fs")
const Enmap = require('enmap')

const client = new Discord.Client({disableEveryone: true})
client.commands = new Enmap()

const cmdFiles = readdirSync('./commands')
cmdFiles.forEach(f => {
    try {
      const props = require(`./commands/${f}`)
      if (f.split('.').slice(-1)[0] !== 'js') return
  
      console.log('log', `Carregando comando: ${props.help.name}`)
  
      if (props.init) props.init(client)
  
      client.commands.set(props.help.name, props)
      if (props.help.aliases) {
        props.alias = true
        props.help.aliases.forEach(alias => client.commands.set(alias, props))
      }
    } catch (e) {
      console.log(e)
    }
  })
  
  /** Então carregamos o evento quase do mesmo modo que o processo dos comandos. */
  const evtFiles = readdirSync('./events/')
  console.log('log', `Carregando o total de ${evtFiles.length} eventos`)
  evtFiles.forEach(f => {
    const eventName = f.split('.')[0]
    const event = require(`./events/${f}`)
  
    client.on(eventName, event.bind(null, client))
  })
  
  client.on('error', (err) => {
    console.log('error', err)
  })
  
  /** Então finalmente iniciamos o Bot. */
  client.login(process.env.BOT_TOKEN)