module.exports = async (client, message) => {

    const constants = require('../utils/constants')
    const channels = require('../channels.json')
    if (message.channel.id === channels.suggestions) {
      await message.react("605008349356097566")
      await message.react("605008475730345984")
      return
    }
    /** É uma boa pratica ignorar outros bots. isso faz o bot se auto-ignorar também.
     * E Também não entrara em um loop de spam...
     */
    if (message.author.bot) return
  

  
    /** Outra boa pratica é ignorar qualquer mensagem que não começe com o prefixo escolhido do bot.
     * OBS: O PREFIXO E PEGO ATRAVES DAS CONFIGURAÇÕES EM client.settings.
     */
    if (message.content.indexOf(process.env.PREFIX) !== 0) return
  
    /** Então nós separamos o nome do comando de seus argumentos que são passados ao comando em si. */
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
  
    /** Então se o comando existir ele irá ser executado.
     * Além disso o console também exibira o comando executado e quem o executou.
     */
    const cmd = client.commands.get(command)
    if (!cmd) return

    cmd.run(client, message, args)
  }