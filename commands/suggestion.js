module.exports = {
    run: async (client, message, args) => {
        const constants = require('../utils/constants')
        const channels = require('../channels.json')
        const Discord = require("discord.js")
        // Nick
        const nickEmbed = new Discord.RichEmbed()
            .setTitle("Pergunta 1")
            .setDescription("Qual é o seu nick?")
            .setColor(message.guild.members.get(message.author.id).displayHexColor)
            .setFooter(message.author.username, message.author.displayAvatarURL)
        await message.channel.send(nickEmbed)
        const nick = await message.channel.awaitMessages(m => m.author.id === message.author.id, { time: 30000, max: 1 }).then(m => m.first())
        // Sugestão
        const suggestionEmbed = new Discord.RichEmbed()
            .setTitle("Pergunta 2")
            .setDescription("Qual é sua sugestão?")
            .setColor(message.guild.members.get(message.author.id).displayHexColor)
            .setFooter(message.author.username, message.author.displayAvatarURL)
        await message.channel.send(suggestionEmbed)
        const suggestion = await message.channel.awaitMessages(m => m.author.id === message.author.id, { time: 30000, max: 1 }).then(m => m.first())
        await message.channel.send(`${constants.SUCCESS_EMOJI} │ Sua sugestão foi enviada com sucesso!`)
        

        // Final embed
        const finalEmbed = new Discord.RichEmbed()
            .setTitle(`Sugestão de ${message.author.username}#${message.author.discriminator} (ID: ${message.author.id})`)
            .setThumbnail(message.author.displayAvatarURL)
            .setColor(constants.DISCORD_BLURPE)
            .addField("Nick: ", nick.content, false)
            .addField("Sugestão: ", suggestion.content, false)
        await client.channels.get(channels.suggestions).send(finalEmbed)
 

    },
    get help () {
        return {
            name: 'sugestao',
            category: 'Geral',
            description: 'Sugira algo para o servidor',
            usage: 'suport'
        }
    }

}