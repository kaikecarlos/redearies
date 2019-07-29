module.exports = {
    run: (client, message, args) => {
       message.channel.send(`Pong! API: ${Math.round(client.ping)}ms`)
    },

    get help () {
        return {
            name: 'ping',
            category: 'Geral',
            description: 'Mostra a latência do Bot',
            usage: 'ping'
        }
    }
}