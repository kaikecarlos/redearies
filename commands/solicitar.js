module.exports = {
    run: async (client, message, args) => {
        const Discord = require("discord.js")
        const request = require('node-fetch')
        const constants = require('../utils/constants')

        // Qual é seu nick?
        const nickEmbed = new Discord.RichEmbed()
            .setTitle("Pergunta 1")
            .setDescription("Qual é o seu nick?")
            .setColor(message.guild.members.get(message.author.id).displayHexColor)
            .setFooter(message.author.username, message.author.displayAvatarURL)
        await message.channel.send(nickEmbed)
        const nick = await message.channel.awaitMessages(m => m.author.id === message.author.id, { time: 30000, max: 1 }).then(m => m.first())
        // Vip ou cash?
        const vipOrCashEmbed = new Discord.RichEmbed() 
            .setTitle("Pergunta 2")
            .setDescription("Você não recebeu seu **Vip** ou seu **Cash**?")
            .setColor(message.guild.members.get(message.author.id).displayHexColor)
            .setFooter(message.author.username, message.author.displayAvatarURL)
        await message.channel.send(vipOrCashEmbed)
        const vipOrCash = await message.channel.awaitMessages(m => m.author.id === message.author.id, { time: 30000, max: 1 }).then(m => m.first())
        await message.channel.send(`${constants.SUCCESS_EMOJI} │ Sua solicitação foi enviada com sucesso!`)

        // Final Embed
        const channels = require('../channels.json')
        const finalEmbed = new Discord.RichEmbed()
            .setTitle(`Solicitação por ${message.author.username}#${message.author.discriminator} (ID: ${message.author.id})`)
            .addField("Nome do Jogador", nick.content, false)
            .addField("O jogador não recebeu: ", vipOrCash.content, false)
            .setColor(constants.DISCORD_BLURPE)
        await client.channels.get(channels.soliciations).send(finalEmbed)

    },

    get help () {
        return {
            name: 'solicitar',
            category: 'Geral',
            description: 'Não recebeu um Vip ou Cash que pagou? Abra uma solicitação!',
            usage: 'solicitar'
        }
    }

    
}