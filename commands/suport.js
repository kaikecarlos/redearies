const Discord = require('discord.js')
const channels = require('../channels.json')
module.exports = {
    run: async (client, message, args) => {
        const filter = m => m.author.id === message.author.id
        // Type Embed
        const typeEmbed = new Discord.RichEmbed()
            .setTitle("Pergunta 1")
            .setDescription("Você quer ajuda para o **Discord** ou para o **Minecraft**?")
            .setColor(message.guild.members.get(message.author.id).displayHexColor) 
            .setFooter(message.author.username, message.author.displayAvatarURL)
        await message.channel.send(typeEmbed)
        const type = await message.channel.awaitMessages(m => m.author.id === message.author.id, { time: 30000, max: 1 }).then(m => m.first())
        // Nick Embed
        const nickEmbed = new Discord.RichEmbed()
            .setTitle("Pergunta 2")
            .setDescription("Qual é o seu nick? ")
            .setColor(message.guild.members.get(message.author.id).displayHexColor)
            .setFooter(message.author.username, message.author.displayAvatarURL)
        await message.channel.send(nickEmbed)
        const nick = await message.channel.awaitMessages(m => m.author.id === message.author.id, { time: 30000, max: 1 }).then(m => m.first())
        // Descreva sua dúvida
        const questionEmbed = new Discord.RichEmbed()
            .setTitle("Pergunta 3")
            .setDescription("Qual é sua dúvida?")
            .setColor(message.guild.members.get(message.author.id).displayHexColor)
            .setFooter(message.author.username, message.author.displayAvatarURL)
        await message.channel.send(questionEmbed)
        const question = await message.channel.awaitMessages(m => m.author.id === message.author.id, { time: 30000, max: 1 }).then(m => m.first())
        await message.channel.send(`${constants.SUCCESS_EMOJI} │ Sua dúvida foi enviada com sucesso!`)
        
       // Começar montando o embed final
       const finalEmbed = new Discord.RichEmbed().setTitle(`Duvida de ${message.author.username}(ID: ${message.author.id})`)
       finalEmbed.setColor("#7289DA")
       finalEmbed.setThumbnail(message.author.displayAvatarURL)
       finalEmbed.addField("O usuário tem duvida no: ", type.content, false)
       finalEmbed.addField("O Nick do usuário é: ", nick.content, false)
       finalEmbed.addField("A dúvida do usuário é:", question.content, false)

       await client.channels.get(channels.questions).send(finalEmbed)
    },
    
    get help () {
        return {
            name: 'suport',
            category: 'Geral',
            description: 'Pergunte algo para a staff',
            usage: 'suport'
        }
    }
}